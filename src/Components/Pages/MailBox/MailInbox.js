import parse from "html-react-parser"
import classes from "./MailBox.module.css";

const MailInbox=(props)=>{
    console.log(props)
    return(
        <div >
            <div className={classes.itemDivmail}>
                <label className={classes.gap}>{props.subject}</label>
                <label className={classes.gap}>{parse(props.body)}</label>
                <label className={classes.gap}>{props.sender}</label>
            </div>
        </div>
    )
}

export default MailInbox;