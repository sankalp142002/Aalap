
import { useState } from 'react';
import { HeartSwitch } from '@anatoliygatt/heart-switch';
import '../css/feedback.css'

function Feedback({inp , op}) {
    const [checked, setChecked] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [feedback, setFeedback] = useState("NONE");
 

    const sendf = async (e) =>{
        e.preventDefault();
        const options = {
          method: "POST",
          mode: 'no-cors',
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        
          },
          body: JSON.stringify({
            "input": "lorem5",
            "generated_response": "op",
            "feedback": true,
            "text_feedback": "feedback",
        }),
        };
    
        try {
          const response = await fetch(
            "https://llm-feedback-fer6v2lowq-uc.a.run.app/store_feedback",
            options
          );
          const json = await response.json();
          console.log("Response data:", json);
        } catch (error) {
          console.error(error);
          console.log("Response erroe:", error);
        }
    }

    console.log(inp, op, checked, feedback)
    
    return (
    <div className='feedback'>
      <p onClick={() => setToggle(!toggle)} className='f-button'>Add Feedback?</p>

      <article className={toggle? "l-design-widht" : "l-design-widht f-design"}>


      <div className="card f-card">
        <div className='f-like'>
        <p className='f-q'>Did you like the Responce?</p>
      <HeartSwitch
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
      }}
    />
        </div>

    <textarea 
    onChange={(event) => setFeedback(event.target.value)}
     className='f-text' placeholder='Write a breef feedback...'></textarea>
    <button onClick={sendf} className='f-send'>Send Feedback</button>
    </div>

      

      </article>
    </div>
  )
}

export default Feedback
