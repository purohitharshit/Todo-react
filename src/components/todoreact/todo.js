import React, {useState,useEffect} from 'react';
import "./style.css";

// get the local storage data back even after refreshing
const getLocalData = ()=>{
    const lists = localStorage.getItem("mytodolist"); // mytodolist is the key

    if(lists) // if data exist in list
    {
        return JSON.parse(lists); // if there is data in todolist then only we should pass data
                     // lists return string format to convert it in array format we use JSON.parse
    }
    else
    {
        return []; // else return empty array
    }
};

const Todo = () => {
    //these all are state variables 
    const [inputdata,setInputData] = useState("");
    const [items,setItems] = useState(getLocalData());
    const [isEditItem,setIsEditItem] = useState("");
    const [toggleButton,setToggleButton] = useState(false);

    const addItem = ()=> {
        if(!inputdata)
        {
            alert("plz fill the data");
        }
        else if(inputdata && toggleButton) // if inputdata is present && value of toggleButton is true
        {
            setItems(
                items.map((curElem)=>{
                    if(curElem.id === isEditItem)
                    {
                    return {...curElem,name:inputdata} // current element prev data is same as it is ...but if id matches editItem then it "modifies" that data
                    } // ... is a spread operator -- it indicates that the data in the previous state should be preserved
                    return curElem;  // if id do not matches with the data editItem them return curElem
                })

            )
            setInputData([]);  // after i enter input data..input field must reset to empty text
            setIsEditItem();
            setToggleButton(false);
        }
        
        else
        {
            const myNewInputData = {
                id:new Date().getTime().toString(), // for every task we made id ...and this id will change with time...so each task has differnet id
                name:inputdata,

            }
            setItems([...items,myNewInputData])    // ... is a spread operator that tells that you store previous state data and add new data(inputdata)
            setInputData(""); // after writing any task ...it is used to remove the task from placeholder value
        }
    };

    // edit the items

    const editItem = (index)=>{
        const item_todo_edited = items.find((curElem)=>{
           return curElem.id === index;
        })
        setInputData(item_todo_edited.name); // when i click on edit icon...the data should come on placeholder value 
        setIsEditItem(index);
        setToggleButton(true);  // when i click edit button ...at placeholder '+' icon will change to edit icon

    }

    //how to delete items 
    // for deleting items we must know the id of each unique element
    const deleteItem = (index) =>{ // on which element user clicked, we get id of that element here as 'index'
        const updatedItem= items.filter((curElem)=>{
           return curElem.id !== index  // it runs loop and checks the curElement that is matching with the index ...and returns the array excluding that deleted (matched with index) one.
        })
        setItems(updatedItem);
    }

    // remove all elements
    const removeAll = ()=>{
        setItems([]); // we pass empty array inside setItems .....will return an empty array
    }

    // adding local storage

    useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items))  // in localstorage we can pass only strings ...(items) is array so to make sure that the input is string we use JSON.stringify(items)
    }, [items]) // setItem takes two parameter in the form of key and value
    
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src="./images/icon1.png" alt='logo'/>
                        <figcaption>Add Your Items here! </figcaption>
                    </figure>
                    <div className='addItems'>
                        <input
                            type="text"
                            placeholder="✍ Add Items"
                            className="form-control"
                            value={inputdata}
                            onChange={(event)=> setInputData(event.target.value)
                            }

                        />
                        {toggleButton ? <i className="far fa-edit add-btn" onClick={addItem}></i> : <i className="fa fa-plus add-btn" onClick={addItem}></i>} {/*if value of toggle button is true then show 'edit' icon else show '+' icon */}

                        
                    </div>
                    <div className='showItems'>
                        {items.map((curElem)=>{
                            return(
                                <div className='eachItem' key={curElem.id}> {/* every task is assigned a ubique id for ease of deletion */}
                            <h3>{curElem.name}</h3>
                            <div className='todo-btn'>
                            <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                            <i className="far fa-trash-alt add-btn"
                             onClick={()=>  deleteItem(curElem.id)}></i> {/* every task is assigned a ubique id for ease of deletion */}
                               </div>
                               </div>
                            

                            );
                        })}
                    </div> 
                        
                    <div className="showItems">
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button> {/*data-sm-link-text -- for hover effect*/}
                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo;