import loadingGif from "/loading.gif";

function UploadingFile() {
  return (
    <>
      <div>
        <img src={loadingGif} alt="Uploading..." />
        Extracting text from file
      </div>
    </>
  );
}
export default UploadingFile;
