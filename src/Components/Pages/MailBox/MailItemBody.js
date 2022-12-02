import { useSelector } from "react-redux"
import parse from "html-react-parser"
import axios from "axios"

const MailItemBody =()=>{
    const mailItem = useSelector(state=>state.milItem.item)
    console.log(mailItem)

    const deleteHandler=async(event)=>{
        event.preventDefault();
        const receiverDlt = mailItem.receiver;
        const nameDlt   = receiverDlt.substring(0, receiverDlt.lastIndexOf("@"));
        const idDlt = mailItem.id;
        try{
            const res = await axios.delete(`https://mailbox-client-default-rtdb.firebaseio.com/${nameDlt}/receive/${idDlt}.json`)
            console.log(res)
            if(res.statusText==='OK'){
                alert('Deleted');
            }
        }catch(err){
            console.log(err);
        }
    }
    return(
        <div>
            <div>{mailItem.subject} <hr></hr> </div>
            <div><button onClick={deleteHandler} >Delete Mail</button></div>
            <div>
                <div>
                    <div><label>{mailItem.sender}</label></div>
                    <div><span>To: </span> <span> {mailItem.receiver}</span></div>
                </div>
                <div>
                    <p>{parse(mailItem.body)}</p>
                </div>
                
            </div>
            
        </div>
    )
}

export default MailItemBody;