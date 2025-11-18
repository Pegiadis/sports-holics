/**
 * homepage-configuration controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::homepage-configuration.homepage-configuration', ({ strapi }) => ({
  async update(ctx) {
    const { data } = ctx.request.body;
    
    // Validate carousel total (max 6)
    const carouselTotal = 
      (data.carouselFootball?.length || 0) +
      (data.carouselBasketball?.length || 0) +
      (data.carouselFormula1?.length || 0) +
      (data.carouselNews?.length || 0);
    
    if (carouselTotal > 6) {
      return ctx.badRequest('Total carousel articles cannot exceed 6. You have ' + carouselTotal);
    }
    
    // Validate main news total (max 8)
    const mainNewsTotal = 
      (data.mainNewsFootball?.length || 0) +
      (data.mainNewsBasketball?.length || 0) +
      (data.mainNewsFormula1?.length || 0) +
      (data.mainNewsNews?.length || 0);
    
    if (mainNewsTotal > 8) {
      return ctx.badRequest('Total main news articles cannot exceed 8. You have ' + mainNewsTotal);
    }
    
    // If validation passes, proceed with update
    return await super.update(ctx);
  }
}));

