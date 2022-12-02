import { useDispatch , useSelector } from 'react-redux';
import { composeActions } from "../../Store/ComposeToggle";
import axios from 'axios';
import Compose from "../MailBox/Compose";
import classes from './MailBoxBody.module.css';
import { useEffect, useState } from 'react';
import MailInbox from "./MailInbox";
import MailItemBody from "./MailItemBody";
import { MailItemActions } from "../../Store/MailFullBody";
import { InboxActions } from "../../Store/InboxToggle";

const MailBoxBody =()=>{
    const dispatch = useDispatch();
    const isCompose = useSelector(state=>state.compose.isCompose)
    const isInbox = useSelector(state=>state.isInbox.isInbox)
    const isSentbox = useSelector(state=>state.isInbox.setBox)
    const isClicked = useSelector(state=>state.milItem.isClicked)
    var arr=[];
    var sendArr=[];
    const [msg , setmsg] = useState([]);
    const [Sendmsg , setSendmsg] = useState([]);
    const [totalCount, setCount] = useState(0);

    const composeHandler=(event)=>{
        event.preventDefault();
        dispatch(composeActions.toggleCompose());
        dispatch(MailItemActions.setClicked(false))
    }

    const loadInbox= async()=>{
        const Ename = localStorage.getItem('Email');
        const name  = Ename.substring(0, Ename.lastIndexOf("@"));
        try{
            const res = await axios.get(`https://mailbox-client-default-rtdb.firebaseio.com/${name}/receive.json`);
            if(res.statusText==='OK'){
                let index = 0;
                for (const key in res.data){   
                    arr[index]=res.data[key]
                    arr[index].id=key;
                    index++;
                }
            } 
            const sendRes = await axios.get(`https://mailbox-client-default-rtdb.firebaseio.com/${name}/send.json`);
        if(sendRes.statusText==='OK'){
            let indexSend = 0;
            for (const key in sendRes.data){   
                sendArr[indexSend]=sendRes.data[key]
                sendArr[indexSend].id=key;
                indexSend++;
            }
            }
            setmsg([...arr]);
            setSendmsg([...sendArr]);
        }catch(err){
            console.log(`${err}`);
        }
    };
useEffect(()=>{ loadInbox() },[])


        const mails = msg.map((element)=>{

            return (<MailInbox body={element.body} 
            sender={element.sender} 
            subject={element.subject}
            receiver={element.receiver}
            key={element.id}
            id={element.id}
            isRead={element.read}
            />)
        })
        const sendMails = Sendmsg.map((element)=>{
            return (<MailInbox body={element.body} 
                sender={element.sender} 
                subject={element.subject}
                receiver={element.receiver}
                key={element.id}
                id={element.id}
                isRead={element.read}
                />)
        })
        const sendBoxHandler=()=>{
            dispatch(InboxActions.setInbox(false));
            dispatch(InboxActions.setInbox(ture));
            dispatch(MailItemActions.setClicked(false));
        }
        const InBoxHandler=()=>{
            loadInbox()
            dispatch(InboxActions.setInbox(true))
            dispatch(MailItemActions.setClicked(false))
            dispatch(InboxActions.setSentBox(false));

        }

        const counter =()=>{
            let c=0;
            msg.map((element)=>{
                if(!element.read){
                    c++;
                }
                setCount(c); 
            })
        }
      useEffect(()=>{ counter() },[msg])

      useEffect(()=>{
        setTimeout(() => {
            loadInbox()
        }, 9000);
      },[msg])

    return(
        <div>
            <div className={classes.sideBar} >
                <div className={classes.sideBarContent}>
                    <button className={classes.ComposeBtn} onClick={composeHandler} > Compose </button>
                <div className={classes.inbox} onClick={InBoxHandler} >
                   <label>Inbox{totalCount}</label> 
                </div>
                <div className={classes.inbox} onClick={sendBoxHandler} >
                    <label> Sent</label>
                </div>
                </div>
            </div>
            {isCompose && <div className={classes.contentDiv} >
                <Compose />
            </div>}
            {!isCompose && <div>
                {isInbox && <div className={classes.mailDivitems}>{mails}</div>}
                {isSentbox && <div className={classes.mailDivitems}>{sendMails}</div>}
                </div>}
            {isClicked && <div className={MailItemDiv}>
                <MailItemBody />
                </div>
                }
        </div>
    )
};

export default MailBoxBody;