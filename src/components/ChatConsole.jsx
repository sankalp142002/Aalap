
import { useState } from "react";
import "../css/chatconsole.css";
import logo from "../assets/final-logo-01-removebg-preview.png";

import { HeartSwitch } from '@anatoliygatt/heart-switch';
import '../css/feedback.css'


function ChatConsole() {
  const [output, setOutput] = useState("");

  
  const [r1, setR1] = useState(1);
  const [r2, setR2] = useState(400);
  const [r3, setR3] = useState(1.03);
  const [r4, setR4] = useState(10);
  const [r5, setR5] = useState(5);
  const [r6, setR6] = useState(0.95);
  const [r7, setR7] = useState(0.5);
  const [r8, setR8] = useState(0.95);
  const [r9, setR9] = useState(true);
  const [r10, setR10] = useState(true);
  const [r11, setR11] = useState(false);
  const [r12, setR12] = useState(true);
  const [r13, setR13] = useState(true);

  const [sys,setSys] = useState("You are a helpful assistant. Your task is to help the user and generate answers according to the user.");
  const [ins,setIns] = useState("");

  const [checked, setChecked] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [feedback, setFeedback] = useState("NONE");
 

    const sendf = async (e) => {
        e.preventDefault();

        const data = {
          "input":  "[INST] <<SYS>> " + sys  + " <</SYS>> \n\n " + ins  + " [/INS]",
          "generated_response": output,
          "feedback": checked,
          "text_feedback": feedback,
      }


        const options = {
          method: "POST",
          headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data),
        };
    
        try {
          const response = await fetch(
            "https://llm-feedback-fer6v2lowq-uc.a.run.app/store_feedback/",
            options
          );
          const json =  response.json();
          console.log("Response data:", json);
          console.log("done")
        } catch (error) {
          
          console.log("Response erroe:", error);
        }
    }

    const sendsw = async () => {


      const data = {
        "input":  "[INST] <<SYS>> " + sys  + " <</SYS>> \n\n " + ins  + " [/INS]",
        "generated_response": output,
    }


      const options = {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      };
  
      try {
        const response = await fetch(
          "https://llm-feedback-fer6v2lowq-uc.a.run.app/store_llm_data/",
          options
        );
        const json =  response.json();
        console.log("Response data:", json);
        console.log("done")
      } catch (error) {
        
        console.log("Response erroe:", error);
      }
  }

    console.log( checked, feedback)

  const extract = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "inputs": "[INST] <<SYS>> " + sys  + " <</SYS>> \n\n " + ins  + " [/INS]",
        "parameters": {
          "best_of": r1,
          "decoder_input_details": r12,
          "details": r9,
          "do_sample": r10,
          "max_new_tokens": r2,
          "repetition_penalty": r3,
          "return_full_text": r11,
          "seed": null,
          "stop": [
            "photographer"
          ],
          "temperature": r7,
          "top_k": r4,
          "top_n_tokens": r5,
          "top_p": r6,
          "truncate": null,
          "typical_p": r8,
          "watermark": r13,
      }
    }),
    };

    try {
      const response = await fetch(
        "http://34.66.47.9:8080/generate",
        options
      );
      const json = await response.json();
      console.log(json.generated_text);
      setOutput(json.generated_text);
      sendsw();

    } catch (error) {
      console.error(error);
      sendsw();
    }
  };


  console.log(r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11,r12,r13,sys,ins)

  const [show, setShow] = useState(true);

	const copyText = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(output);
}

  return (
    <div className="chat">
      <form action="">
        <article className="l-design-widht">
          <h2> Aalap Control Panel</h2>
          <div className="card">
          <div className="Advo">
            <p onClick={() => setShow(!show)} className="advh">Advance Options</p>
          </div>
            <div className="t_input">
              
              <label className="input ">
                <textarea
                  className={show ? "input__field inp2" : "input__field"}
                  type="text"
                  placeholder=" "
                  onChange={(event) => setIns(event.target.value)}
                />
                <span className="input__label">User Input</span>
              </label>

              <label className={show ? "input hide" : "input h"} >
                <textarea
                  className="input__field"
                  type="text"
                  
                  defaultValue="You are a helpful assistant. Your task is to help the user and generate answers according to the user. "
                  onChange={(event) => setSys(event.target.value)}
                />
                <span className="input__label">System Input</span>
              </label>
            </div>

            <label className={show ? "border hide" : "border"}>
              {/*} <textarea className="input__field" type="text" placeholder=" " />
              <span className="input__label">Parameters</span> */}

              <div className="flex2">
                <p className="p_text">best_of</p>
                <div className="P_input">
                  <input
                    step={1}
                    type="range"
                    className="custom-range"
                    defaultValue={1}
                    min="1"
                    max="5"
                    onChange={(event) => setR1(Number(event.target.value))}
                  />
                  <p>{r1}</p>
                </div>
              </div>

              

          

              <div className="flex2">
                <p className="p_text">max_new_tokens</p>
                <div className="P_input">
                  <input
                    step={1}
                    type="range"
                    className="custom-range"
                    defaultValue={4000}
                    min="0"
                    max="4069"
                    onChange={(event) => setR2(Number(event.target.value))}
                  />
                  <p>{r2}</p>
                </div>
              </div>


              <div className="flex2">
                <p className="p_text">repetition_penalty</p>
                <div className="P_input">
                  <input
                    step={0.01}
                    type="range"
                    className="custom-range"
                    defaultValue={1.03}
                    min="0"
                    max="2"
                    onChange={(event) => setR3(Number(event.target.value))}
                  />
                  <p>{r3}</p>
                </div>
              </div>
             
              <div className="flex2">
                <p className="p_text">top_k</p>
                <div className="P_input">
                  <input
                    step={1}
                    type="range"
                    className="custom-range"
                    defaultValue={10}
                    min="1"
                    max="10"
                    onChange={(event) => setR4(Number(event.target.value))}
                  />
                  <p>{r4}</p>
                </div>
              </div>

              <div className="flex2">
                <p className="p_text">top_n_tokens</p>
                <div className="P_input">
                  <input
                    step={1}
                    type="range"
                    className="custom-range"
                    defaultValue={5}
                    min="0"
                    max="5"
                    onChange={(event) => setR5(Number(event.target.value))}
                  />
                  <p>{r5}</p>
                </div>
              </div>
              <div className="flex2">
                <p className="p_text">top_p</p>
                <div className="P_input">
                  <input
                    step={0.01}
                    type="range"
                    className="custom-range"
                    defaultValue={0.95}
                    min="0"
                    max="1"
                    onChange={(event) => setR6(Number(event.target.value))}
                  />
                  <p>{r6}</p>
                </div>
              </div>

              <div className="flex2">
                <p className="p_text">temperature</p>
                <div className="P_input">
                  <input
                    step={0.1}
                    type="range"
                    className="custom-range"
                    defaultValue={0.5}
                    min="0.1"
                    max="0.99"
                    onChange={(event) => setR7(Number(event.target.value))}
                  />
                  <p>{r7}</p>
                </div>
              </div>
              <div className="flex2">
                <p className="p_text">typical_p</p>
                <div className="P_input">
                  <input
                    step={0.01}
                    type="range"
                    className="custom-range"
                    defaultValue={0.95}
                    min="1"
                    max="3"
                    onChange={(event) => setR8(Number(event.target.value))}
                  />
                  <p>{r8}</p>
                </div>
              </div>

              <div className="flex2">
                <p className="p_text">details</p>
                <div className="checkbox-wrapper-58">
                  <label className="switch">
                    <input type="checkbox"  defaultChecked 
                    onClick={() => setR9(!r9)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              
              <div className="flex2">
                <p className="p_text">do_sample</p>
                {/* <input type="checkbox" />*/}

                <div className="checkbox-wrapper-58">
                  <label className="switch">
                    <input type="checkbox" defaultChecked
                    onClick={() => setR10(!r10)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="flex2">
                <p className="p_text">return_full_tex</p>
                <div className="checkbox-wrapper-58">
                  <label className="switch">
                    <input type="checkbox" 
                    onClick={() => setR11(!r11)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="flex2">
                <p className="p_text">decoder_input_details</p>
                <div className="checkbox-wrapper-58">
                  <label className="switch">
                    <input type="checkbox" defaultChecked
                    onClick={() => setR12(!r12)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>

              <div className="flex2">
                <p className="p_text">watermark</p>
                <div className="checkbox-wrapper-58">
                  <label className="switch">
                    <input type="checkbox" defaultChecked
                    onClick={() => setR13(!r13)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </label>

            <div className="button-group">
              <button onClick={extract}>Generate</button>
            </div>
          </div>
          
        </article>
      </form>
      
      <div className="output">
        
        <article className="l-design-widht">
        <h2> Aalap Output</h2>
          <div className="card flex">
          <div className="text "> {output} </div>
            <form action="">
              <div className="button-group">
                <button onClick={copyText}>Copy</button>
                <button>Reset</button>
              </div>
            </form>
          </div>
        </article>
      </div>


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
     className='f-text' placeholder='Write a brief feedback...'></textarea>
    <button onClick={sendf} className='f-send'>Send Feedback</button>
    </div>

      

      </article>
    </div>
      <footer>
        <img src={logo} alt="" />

      </footer>
    </div>
  );
}

export default ChatConsole;
