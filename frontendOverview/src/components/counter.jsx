import {useState} from "react";
function counter(){
    const [count ,setcount]=useState(0);
    return(
<button onClick={()=> setcount(count -1)}>{count}</button>
    );
}
 export default counter;