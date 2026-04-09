/**
 * Strapi cron tasks.
 *
 * Runs every minute. Publishes any draft article whose `scheduledPublishAt`
 * is set and has already passed. Acts on all five article content types:
 *
 *   football-article, basketball-article, formula1-article,
 *   news-article, blog-article
 *
 * Implementation notes:
 *   - Uses the Strapi 5 Document Service API (strapi.documents()).
 *   - Filters explicitly for drafts (publishedAt IS NULL) as an extra guard
 *     beyond status: 'draft', so a data race can never re-publish an already
 *     published document.
 *   - Each content type is handled in its own try/catch so a failure on one
 *     type does not prevent the others from running on the same tick.
 *   - Limit 50 per tick: a sane cap so a single failed cron run does not
 *     queue up thousands of publishes once it recovers. Anything larger is
 *     picked up on the next minute.
 *   - When the container restarts, in-memory cron state is lost but the
 *     schedule is rebuilt automatically on boot. Worst case delay for a
 *     scheduled post during a restart is ~60s.
 */

type ArticleUID =
  | 'api::football-article.football-article'
  | 'api::basketball-article.basketball-article'
  | 'api::formula1-article.formula1-article'
  | 'api::news-article.news-article'
  | 'api::blog-article.blog-article';

const SCHEDULED_UIDS: ArticleUID[] = [
  'api::football-article.football-article',
  'api::basketball-article.basketball-article',
  'api::formula1-article.formula1-article',
  'api::news-article.news-article',
  'api::blog-article.blog-article',
];

type CronContext = {
  strapi: {
    documents: (uid: string) => {
      findMany: (args: Record<string, unknown>) => Promise<Array<{ documentId: string; title?: string }>>;
      publish: (args: { documentId: string }) => Promise<unknown>;
    };
    db: {
      query: (uid: string) => {
        updateMany: (args: { where: Record<string, unknown>; data: Record<string, unknown> }) => Promise<{ count: number }>;
      };
    };
    log: {
      info: (msg: string) => void;
      warn: (msg: string) => void;
      error: (msg: string) => void;
    };
  };
};

export default {
  /**
   * Every minute, publish drafts whose scheduledPublishAt is due.
   */
  'scheduled-publish': {
    task: async ({ strapi }: CronContext) => {
      const now = new Date().toISOString();

      for (const uid of SCHEDULED_UIDS) {
        try {
          const due = await strapi.documents(uid).findMany({
            status: 'draft',
            filters: {
              publishedAt: { $null: true },
              scheduledPublishAt: { $lte: now },
            },
            limit: 50,
          });

          if (due.length === 0) continue;

          strapi.log.info(
            `[scheduled-publish] ${uid}: ${due.length} due for publishing`
          );

          for (const doc of due) {
            try {
              // 1. Publish the draft (creates/updates the published version).
              await strapi.documents(uid).publish({ documentId: doc.documentId });

              // 2. Clear scheduledPublishAt on every row of this document
              //    (both draft and published) via the low-level DB query so
              //    the cron cannot pick it up again on the next tick.
              //    The Document Service update() strips null values on some
              //    Strapi 5 versions, which is why we bypass it.
              try {
                const result = await strapi.db.query(uid).updateMany({
                  where: { documentId: doc.documentId },
                  data: { scheduledPublishAt: null },
                });
                strapi.log.info(
                  `[scheduled-publish] published ${uid}/${doc.documentId}` +
                    (doc.title ? ` — ${doc.title}` : '') +
                    ` (cleared scheduledPublishAt on ${result?.count ?? '?'} rows)`
                );
              } catch (clearErr) {
                strapi.log.warn(
                  `[scheduled-publish] published ${uid}/${doc.documentId} but failed to clear scheduledPublishAt: ${String(clearErr)}`
                );
              }
            } catch (publishErr) {
              strapi.log.error(
                `[scheduled-publish] failed to publish ${uid}/${doc.documentId}: ${String(publishErr)}`
              );
            }
          }
        } catch (listErr) {
          strapi.log.error(
            `[scheduled-publish] findMany failed for ${uid}: ${String(listErr)}`
          );
        }
      }
    },
    options: {
      rule: '*/1 * * * *', // every minute
    },
  },
};
