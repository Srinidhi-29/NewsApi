import NewsItem from './NewsItem';
import axios from 'axios';
import React, {useEffect, useState} from 'react'
import AddCatogary from './AddCatogary';
import './NewsList.css'; 
import { IoAdd } from "react-icons/io5";

const NewsList = () => {

    const [articles, setArticles]  = useState([]);
    const [currentCat, setCurrentCat]  = useState({
        catogary:"Techkrunch",
        apiUrl:'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a5cf886a8dd84801a01c8b5bd0da1b0d '

    });
    
    var [cat,setCat] = useState([{
        catogary:"Techkrunch",
        apiUrl:'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a5cf886a8dd84801a01c8b5bd0da1b0d '

    },{
        catogary:"Business",
    apiUrl:' https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a5cf886a8dd84801a01c8b5bd0da1b0d'}]);

    useEffect(()=>{
        const getCurrentArticles = async () =>{
            const res = await axios.get(currentCat.apiUrl);
    
            setArticles(res.data.articles);
            console.log(res);
        }
        getCurrentArticles();
        
    },[currentCat]);
    

    const getArticles = (catt) =>{
        
        setCurrentCat(catt)
        console.log(catt.catogary);
        
    }

    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);

    const handleCallback = (childData) =>{
        setCat([...cat, childData]);
        console.log(childData);
        console.log(cat);
    }

    const [input,setInput] = useState("");

    const[filteredResults, setFilteredResults]= useState([]);

    useEffect(()=>{
        if(input!==''){
            const filteredData = articles.filter((item)=>{
                return Object.values(item).join(' ').toLowerCase().includes(input.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(articles)
        }
    },[input]);

    const isActive=(buttonCat)=>{
        const active = {
            color: "black",
            backgroundColor : '#00F0C2'
          };
        if(currentCat.catogary==buttonCat)
        {
            return active;
        }
    }

    return (
        <div>
            
            {cat.map((catt)=>(
                <button className="catButton" style={isActive(catt.catogary)}  onClick={()=>getArticles(catt) }>{catt.catogary}</button>
            ))}
            
            
            <button className="catButton" variant="primary" onClick={() => setModalShow(true)}>
            <IoAdd />
            </button>
  
            <AddCatogary handleCallback = {handleCallback} handleClose={handleClose} show={modalShow} onHide={() => setModalShow(false)} /><br />
           
            <input className="searchBar" type="text"  placeholder="Search for keywords, author" onChange={(e)=> setInput(e.target.value)} value={input} />
           
            <div>
            {input.length > 1 ? (
                    filteredResults.map(({title,description,url,urlToImage,author,publishedAt}) => { return <NewsItem title={title} description={description} url={url} urlToImage={urlToImage} author={author} publishedAt={publishedAt} />}
                        )):
            (articles.map(({title,description,url,urlToImage,author,publishedAt}) => {
                return <NewsItem title={title} description={description} url={url} urlToImage={urlToImage} author={author} publishedAt={publishedAt} />
            }))} 
            </div>                  
        </div>
    );
        
    
};

export default NewsList;