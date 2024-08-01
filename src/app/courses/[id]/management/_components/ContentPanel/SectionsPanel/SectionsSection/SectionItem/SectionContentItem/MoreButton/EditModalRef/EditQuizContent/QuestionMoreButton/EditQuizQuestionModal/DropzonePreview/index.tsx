"use client";

import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import {
  ClapperboardIcon,
  FolderClosedIcon,
  FolderOpenIcon,
} from "lucide-react";
import { EditQuizQuestionContext } from "../EditQuizQuesitonModalProvider";
import { Image, Spacer } from "@nextui-org/react";
import { VideoPlayer } from "../../../../../../../../../../../../../../../_shared";
import { QuestionMoreButtonContext } from "../..";
import { MediaType, isFileImage } from "@common";
import { getAssetUrl } from "@services";

export const DropzonePreview = () => {
  const onDrop = useCallback((files: Array<File>) => {
    formik.setFieldValue("mediaFile", files.at(0));
  }, []);

  const { formik } = useContext(EditQuizQuestionContext)!;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const { props } = useContext(QuestionMoreButtonContext)!;
  const { question: _question } = props;
  const { mediaId, mediaType } = _question;
  console.log(mediaId, mediaType)

  const type = formik.values.mediaFile
    ? isFileImage(formik.values.mediaFile)
      ? MediaType.Image
      : MediaType.Video
    : mediaType;
  const src = formik.values.mediaFile
    ? URL.createObjectURL(formik.values.mediaFile)
    : getAssetUrl(mediaId);

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="border border-dashed text-primary rounded-medium p-6 grid place-items-center">
          <div className="flex gap-3 items-center">
            {isDragActive ? (
              <FolderOpenIcon
                className="w-5 h-5 text-foreground-400"
                strokeWidth={3 / 2}
              />
            ) : (
              <FolderClosedIcon
                className="w-5 h-5 text-foreground-400"
                strokeWidth={3 / 2}
              />
            )}
            <div className="text-foreground-400 text-sm">
              {isDragActive ? "Dragging..." : "Drag media here"}
            </div>
          </div>
        </div>
      </div>
      {type ? (
        <>
        <Spacer y={4}/>
        <div className="flex justify-between items-center">
          <div className="text-sm">Preview</div>
          <div>
              {
                type === MediaType.Image ?
                  <Image removeWrapper src={src} alt="media" className="w-[200px] aspect-video"/>
                  : <VideoPlayer src={src}  className="w-[200px] aspect-video"/>
              }
          </div>
        </div>
        </>
      ) : null}
    </div>
  );
};
