import "../App.css"
import Flutter from "../assets/flutter.svg"
import Golang from "../assets/golang.png"
import JS from "../assets/javascript.png"
import Node from "../assets/nodejs.png"
import Python from "../assets/python.png"
import React from "../assets/react.png"
import Swift from "../assets/swift.png"


function SDKShow({ theme }) {

    return (
        <div className='page sample'>
            <h1 className={theme==="light" ? "title sample-title": "title sample-title second-title"}>Our SDKs</h1>
            <p className='sample-tagline'>Handle User Management and Authentication with our SDKs</p>
            <div className="sample-rows sdk-rows">
                {SDKs.map((sdk, i) => (
                    <a target="_blank" rel="noreferrer" key={i} href={sdk.link}><img src={sdk.img} className={theme==="light" ? sdk.style2 : sdk.style1} alt="" /></a>
                ))}   
            </div>
        </div>
    )
}


const SDKs = [
    {
        title: "Go",
        img: Golang,
        link: "https://github.com/descope/go-sdk",
        style1: "sdk-img gosdk gosdk-size",
        style2: "sdk-img gosdk-size"
    },
    {
        title: "Node.js",
        img: Node,
        link: "https://github.com/descope/node-sdk",
        style1: "sdk-img nodesdk nodesdk-size",
        style2: "sdk-img nodesdk-size"
    },
    {
        title: "Python",
        img: Python,
        link: "https://github.com/descope/python-sdk",
        style1: "sdk-img pythonsdk",
        style2: "sdk-img"
    },
    {
        title: "React",
        img: React,
        link: "https://github.com/descope/react-sdk",
        style1: "sdk-img reactsdk",
        style2: "sdk-img"
    },
    {
        title: "Web JavaScript",
        img: JS,
        link: "https://www.npmjs.com/package/@descope/web-js-sdk",
        style1: "sdk-img websdk",
        style2: "sdk-img"
    },
    {
        title: "Swift",
        img: Swift,
        link: "https://github.com/descope/swift-sdk",
        style1: "sdk-img swiftsdk",
        style2: "sdk-img"
    },
    {
        title: "Flutter",
        img: Flutter,
        link: "https://github.com/descope/descope-flutter",
        style1: "sdk-img fluttersdk",
        style2: "sdk-img"
    }
] 

  
export default SDKShow