import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';


const api_path = 'localhost:8000'

function App(){
  const [imageSrc,setimageSrc] = useState(null);
  const [SelectedFile,setSelectedFile] = useState(null);
  const [UploadPercentage,setUploadPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event){
    if (SelectedFile){
      event.preventDefault();
      setIsLoading(true);
      event.target.reset();
      const formData = new FormData();
      formData.append("file", SelectedFile);
      axios.post(`http://${api_path}/uploadfile/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percentage = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadPercentage(percentage);
          },
        })
        .then((res) => {
          setUploadPercentage(0);
          setIsLoading(false);
          setTimeout(() => {
            alert("Complete.");
            setimageSrc(res.data);
            setSelectedFile(null);
            // console.log(res.data[2]);
          }, 500);
        })
        .catch((err) => {
          // console.log(err);
          setIsLoading(false);
          alert("Error");
        });
    }
    else{
      alert("Please select a video file.");
      event.preventDefault();
    }
  }
  
  function handleChange(event){
    const maxAllowedSize = 32 * 1024 * 1024;
    setSelectedFile(event.target.files[0])
    if(event.target.files[0].size > maxAllowedSize){
      alert("File is too big.");
      event.target.value = "";
   };
  };

  return (
    <>
      <Head>
        <title>Inference</title>
      </Head>


      {imageSrc === null ?(
      <div>
        <div className='result'>
          <div className='result-image'>
              <Image src={'/fer-line.webp'} width={600} height={400} alt = 'o' priority={true}/>
              <Image src={'/fer-bar.webp'} width={600} height={400} alt = 'o' priority={true} />       
          </div>
        </div>
        <div className='result'>
          <div className='result-image'>
              <Image src={'/ser-line.webp'} width={600} height={400} alt = 'o' priority={true}/>
              <Image src={'/ser-bar.webp'} width={600} height={400} alt = 'o' priority={true} />       
          </div>
        </div>
        <div className='result'>
          <div className='result-image'>
              <Image src={'/ferser-line.webp'} width={600} height={400} alt = 'o' priority={true}/>
              <Image src={'/ferser-bar.webp'} width={600} height={400} alt = 'o' priority={true} />       
          </div>
        </div>
      </div>
      
      ):(
      <div>
        <div className='result'>
          <div className='result-image'>
              <Image src={`data:image/jpeg;base64,${imageSrc[3]}`} width={600} height={400} alt = 'o' priority={true}/>
              <Image src={`data:image/jpeg;base64,${imageSrc[0]}`} width={600} height={400} alt = 'o' priority={true}/>       
          </div>
        </div>
        <div className='result'>
          <div className='result-image'>
              <Image src={`data:image/jpeg;base64,${imageSrc[4]}`} width={600} height={400} alt = 'o' priority={true}/>
              <Image src={`data:image/jpeg;base64,${imageSrc[1]}`} width={600} height={400} alt = 'o' priority={true}/>       
          </div>
        </div>
        <div className='result'>
          <div className='result-image'>
              <Image src={`data:image/jpeg;base64,${imageSrc[5]}`} width={600} height={400} alt = 'o' priority={true}/>
              <Image src={`data:image/jpeg;base64,${imageSrc[2]}`} width={600} height={400} alt = 'o' priority={true}/>       
          </div>
        </div>
      </div>
      )}
      <div className='end-inference'>
        {'Upload your video here '}
      </div>
      <div className='end-inference2'>
        <form className='end-inference3' onSubmit={handleSubmit}>
              <input type="file" accept="video/*" onChange={handleChange} />          
              <button type="submit">Upload</button>
              {UploadPercentage > 0 ? (
                  <div  class="w3-light-grey w3-round-xlarge p">
                    <div class="w3-container w3-blue w3-round-xlarge"
                      style={{ width: `${UploadPercentage}%` }}>
                      {UploadPercentage}%
                    </div>
                  </div> ) : null}
        </form>
        {UploadPercentage === 100 && isLoading ? (
          <div className="loading">
          <div className="loading-spinner"></div>
          <div className="loading-text">Performing model prediction...</div>
           </div>
          ): null}
      </div>
      
    </>
  )
}

export default App