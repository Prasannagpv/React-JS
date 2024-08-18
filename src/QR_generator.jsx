import { useState } from "react"
//import pp from "./qr.png"
//import cat from "./cat-cat-meme.png"


function QR_generator(){

    const [img,setImg]= useState()
    const [loading, setLoading] = useState(false)
    const [qrData,setQrdata] = useState("Prasanna")
    const [qrSize,setQrSize] = useState("150")

 
    async function handelGenerate(e){

        setLoading(true)
        
        try{
            const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
            setImg(url)
        }
        catch(error){
            console.error("Error : " ,error)
        }
        finally{
           
        setLoading(false)
        }
        //setLoading(true)

    }

    function handelDownload(){

        fetch(img).then((response) => response.blob()).then(blob => {
            const link = document.createElement("a");
            link.href =URL.createObjectURL(blob);
            link.download="qrCode.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((error) => {
            console.error("Error ", error)
        });
    }

    return (
        <div className="app-container">
            <h1>QR CODE GENERATOR</h1>
            {loading && <p>please wait...</p>}
            {img && <img src={img} alt="qr.png"  className="qr-image"/>}
            {/* <img src="download (3).jpeg" alt="" className="qr-image"/> */}
            <div className="container">
                <label htmlFor="dataInput" className="inputData">Enter your link:</label>
                <input type="text" id="linkInput" placeholder="link" name="link" onChange={(e) => setQrdata(e.target.value)}/>
                
                <label htmlFor="dataInput"  className="inputData">Enter your image size:</label>
                <input type="text" id="imageSize" placeholder="size" name="size" onChange={(e) => setQrSize(e.target.value)}/>
                
                <button className="generateButt" onClick={handelGenerate}>Generate QR Code</button>
                <button className="downloadButt" onClick={handelDownload}>Download QR Code</button>
            </div>
            <p className="footer">
                Designed By <a href="">prasanna_gpv</a>
            </p>
        </div>
    )
}

export default QR_generator