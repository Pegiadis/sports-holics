import React, { useState } from 'react';
import { Field, FieldLabel, FieldError, FieldHint } from '@strapi/design-system';
import { Button, Flex, Box } from '@strapi/design-system';
import { Play } from '@strapi/icons';
import { VideoBlockModal } from './VideoBlockModal';

interface CustomBlocksInputProps {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  value?: any[];
  onChange: (value: any[]) => void;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Custom Blocks Input that extends the default Blocks editor
 * with support for YouTube video blocks
 */
export const CustomBlocksInput: React.FC<CustomBlocksInputProps> = ({
  name,
  label,
  description,
  error,
  value = [],
  onChange,
  required = false,
  disabled = false,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleAddVideoBlock = (videoData: { url: string; videoId: string }) => {
    const newVideoBlock = {
      type: 'video',
      provider: 'youtube',
      url: videoData.url,
      videoId: videoData.videoId,
    };

    // Add the video block to the content
    const newValue = [...value, newVideoBlock];
    onChange(newValue);
  };

  const handleRemoveBlock = (index: number) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const renderBlock = (block: any, index: number) => {
    if (block.type === 'video') {
      return (
        <Box
          key={index}
          padding={4}
          background="neutral100"
          borderColor="neutral200"
          borderWidth="1px"
          borderRadius="4px"
          marginBottom={2}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Flex gap={2} alignItems="center">
              <Play />
              <div>
                <div style={{ fontWeight: 'bold' }}>YouTube Video</div>
                <div style={{ fontSize: '0.875rem', color: '#666' }}>
                  ID: {block.videoId}
                </div>
              </div>
            </Flex>
            <Button
              variant="danger-light"
              size="S"
              onClick={() => handleRemoveBlock(index)}
              disabled={disabled}
            >
              Διαγραφή
            </Button>
          </Flex>
          {block.videoId && (
            <Box marginTop={2}>
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '4px',
                }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${block.videoId}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 0,
                  }}
                  allowFullScreen
                  loading="lazy"
                  title="YouTube video preview"
                />
              </div>
            </Box>
          )}
        </Box>
      );
    }

    // For other block types, just show the type
    return (
      <Box
        key={index}
        padding={2}
        background="neutral100"
        borderColor="neutral200"
        borderWidth="1px"
        borderRadius="4px"
        marginBottom={2}
      >
        <Flex justifyContent="space-between" alignItems="center">
          <div>{block.type}</div>
          <Button
            variant="danger-light"
            size="S"
            onClick={() => handleRemoveBlock(index)}
            disabled={disabled}
          >
            Διαγραφή
          </Button>
        </Flex>
      </Box>
    );
  };

  return (
    <Field name={name} error={error} required={required}>
      {label && <FieldLabel>{label}</FieldLabel>}
      {description && <FieldHint>{description}</FieldHint>}

      <Box marginTop={2} marginBottom={2}>
        {value.length > 0 && (
          <Box marginBottom={4}>
            {value.map((block, index) => renderBlock(block, index))}
          </Box>
        )}

        <Flex gap={2}>
          <Button
            variant="secondary"
            startIcon={<Play />}
            onClick={() => setIsVideoModalOpen(true)}
            disabled={disabled}
          >
            Προσθήκη YouTube Video
          </Button>
        </Flex>
      </Box>

      {error && <FieldError>{error}</FieldError>}

      <VideoBlockModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onSubmit={handleAddVideoBlock}
      />
    </Field>
  );
};
