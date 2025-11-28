import React, { useState } from 'react';
import {
  Modal,
  Button,
  TextInput,
  Flex,
  Typography,
} from '@strapi/design-system';

interface VideoBlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (videoData: { url: string; videoId: string }) => void;
}

/**
 * Extract YouTube video ID from various URL formats
 */
function extractYouTubeVideoId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return '';
}

/**
 * Validate if URL is a valid YouTube URL
 */
function isValidYouTubeUrl(url: string): boolean {
  return extractYouTubeVideoId(url) !== '';
}

export const VideoBlockModal: React.FC<VideoBlockModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!videoUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }

    const videoId = extractYouTubeVideoId(videoUrl);

    if (!videoId) {
      setError('Invalid YouTube URL. Please use a valid YouTube link.');
      return;
    }

    // Submit the video data
    onSubmit({
      url: videoUrl.trim(),
      videoId,
    });

    // Reset and close
    setVideoUrl('');
    setError('');
    onClose();
  };

  const handleClose = () => {
    setVideoUrl('');
    setError('');
    onClose();
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <Modal.Root open={isOpen} onOpenChange={handleClose}>
      <Modal.Content>
        <Modal.Header>
          <Typography fontWeight="bold" textColor="neutral800" as="h2" id="video-modal-title">
            Προσθήκη YouTube Video
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <Flex direction="column" alignItems="stretch" gap={4}>
            <Typography variant="omega" textColor="neutral600">
              Επικολλήστε το YouTube URL εδώ. Υποστηρίζονται όλοι οι τύποι YouTube links:
            </Typography>
            <Typography variant="pi" textColor="neutral500">
              • https://www.youtube.com/watch?v=VIDEO_ID
              <br />
              • https://youtu.be/VIDEO_ID
              <br />
              • https://www.youtube.com/embed/VIDEO_ID
            </Typography>
            <TextInput
              placeholder="https://www.youtube.com/watch?v=..."
              name="videoUrl"
              value={videoUrl}
              onChange={handleUrlChange}
              error={error}
              aria-label="YouTube URL"
            />
            {error && (
              <Typography variant="pi" textColor="danger600">
                {error}
              </Typography>
            )}
            {videoUrl && isValidYouTubeUrl(videoUrl) && (
              <Flex
                direction="column"
                alignItems="stretch"
                padding={4}
                background="success100"
                borderRadius="4px"
              >
                <Typography variant="omega" textColor="success700" fontWeight="bold">
                  ✓ Έγκυρο YouTube URL
                </Typography>
                <Typography variant="pi" textColor="success600">
                  Video ID: {extractYouTubeVideoId(videoUrl)}
                </Typography>
              </Flex>
            )}
          </Flex>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} variant="tertiary">
            Ακύρωση
          </Button>
          <Button onClick={handleSubmit} variant="default">
            Προσθήκη Video
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal.Root>
  );
};
