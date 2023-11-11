"use client";

export default function ExternalVideo({
    onEnded,
    videoRef
}: {
    onEnded: (e: any) => void;
    videoRef: any
}) {

  return (
    <>
      <video
      id="video"
      ref={videoRef as any}
      onEnded={onEnded}
      preload='auto'
      >
        <source src="/dance.mp4" type="video/mp4"/>
      </video>
    </>
  );
}

