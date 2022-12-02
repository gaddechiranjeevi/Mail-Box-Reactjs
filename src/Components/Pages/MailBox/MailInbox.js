import { useDispatch } from "react-redux";
import axios from "axios";
import { MailItemActions } from "../../Store/MailFullBody";
import { InboxActions } from "../../Store/InboxToggle";
import parse from "html-react-parser"
import classes from "./MailBox.module.css";

const MailInbox=(props)=>{
    const dispatch = useDispatch();
    console.log(props)

    const mailBoxHandler=async()=>{ 
        console.log(props)
        dispatch(MailItemActions.addNewItem(props))
        dispatch(MailItemActions.setClicked(true));
        dispatch(InboxActions.setInbox(false));
        console.log(props.id)
        if(!props.isRead){

            const receiver = props.receiver;
            const name   = receiver.substring(0, receiver.lastIndexOf("@"));
            const id = props.id;
            const data ={
                "read": true
            }
            try{
                const res = await axios.patch(`https://mailbox-client-default-rtdb.firebaseio.com/${name}/receive/${id}.json`,data)
                console.log(res)
            }catch(err){
                console.log(err);
            }
        }
    }
    return(
        <div >
            <div className={classes.itemDivmail} onClick={mailBoxHandler}>
                {!props.isRead && <span className={props.isRead? 'read' : 'unread'}>•</span>}
                <label className={classes.gap}>{props.subject}</label>
                <label className={classes.gap}>{parse(props.body)}</label>
                <label className={classes.gap}>{props.sender}</label>
            </div>
        </div>
    )
}

export default MailInbox;