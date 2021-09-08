/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Video } from 'components/core';
import { TextField } from 'components/form';
import { useFormik } from 'formik';
import React, { FC, useEffect, useRef } from 'react';
import videojs from 'video.js';

import { initialLaneValues } from '../schema';
import { AddTrafficLaneModalProps } from './types';

const AddTrafficLaneModal: FC<AddTrafficLaneModalProps> = ({
  modalOpen,
  setModalOpen,
  onSubmit,
}) => {
  const { getFieldProps, values, handleSubmit } = useFormik({
    initialValues: { ...initialLaneValues },
    onSubmit,
  });

  const videoNode = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const options = {
      sources: [{ src: values.videoUrl }],
      responsive: true,
      autoplay: true,
    };

    if (values.videoUrl && videoNode.current) {
      playerRef.current = videojs(videoNode.current, options);
    }
  }, [values.videoUrl]);

  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen}>
      <>
        <div className="shadow sm:rounded-md">
          <div className="p-5 bg-gray-50 border-b sm:px-6">
            <h3 className="text-xl font-medium leading-6 text-gray-900">
              Add Traffic Lane
            </h3>
            <p className="mt-1 text-sm text-red-500">
              Once added, information regarding this traffic lane cannot be
              changed.
            </p>
          </div>
          <div className="px-4 py-6 bg-white">
            <div className="grid gap-6">
              <TextField
                label="Lane Name"
                placeholder="ex: street or road name"
                {...getFieldProps('name')}
              />
              <TextField
                label="Video Streaming URL"
                placeholder="http://example.com"
                {...getFieldProps('videoUrl')}
              />
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Preview
                </label>
                {values.videoUrl ? (
                  <Video height="250" videoNode={videoNode} />
                ) : (
                  <div
                    className="text-sm text-gray-400"
                    style={{ height: 250 }}
                  >
                    No preview available
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 flex justify-end gap-4 bg-gray-50">
          <Button styleType="clear" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              closeModal();
            }}
          >
            Add lane
          </Button>
        </div>
      </>
    </Modal>
  );
};

export default AddTrafficLaneModal;
