import React, { Component }  from 'react';
import web3 from "./web3";
import ethiopia from './ethiopia';
import Prando from 'prando';
import minty from './minty';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { File } from 'web3.storage/dist/bundle.esm.min.js';

function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVkNmZkZkJCZUMxNkU1ZjcwOEI4M2Y1QjNhMzM5MzBDRTkxMGFGMDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg0OTA2NzY0MzAsIm5hbWUiOiJFdGhpb3BpYXYxIn0.Ny7MnwcSNRv3GEZeQLZmrZNZ4_L3Cac-F_mi9XEh2fg';
}
function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}


class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }
  state={
    address: '',
    uri: '',
    file: {},
    cid: '',
    blob: {},
    message: '',
    owned: '',
    bal: false,
    baseURL: '',
    img: '',
  }

  async componentDidMount(){
    const accounts = await web3.eth.getAccounts();
    this.state.address = accounts[0];
    this.getNFT();
    const bal = await minty.methods.balanceOf(accounts[0]).call();
    console.log("NFT Balance: ", bal);
    if (bal > 0) {
      this.setState({owned: "Hello friend, looks like you already own this NFT!  Make a post below..."});
      this.setState({bal:true});
    } else {
      this.setState({owned: "This profile pic is derived from your wallet address and is uniquely yours.  If you want to make a post, please mint for .1 $MATIC"});
      this.setState({bal:false})
    }
    //const hash = await minty.methods.tokenURI(1).call();
    //console.log(hash);
    //const baseURL = hash.replace("ifps://", "https://") + ".ipfs.dweb.link/image.png";
    //this.setState({baseURL:baseURL});
    console.log(accounts[0]);
    const myAccount = accounts[0];
    let rng = new Prando(myAccount);
    var roll = [];
    for (var i=0; i < 10; i++) {
      roll.push(rng.nextInt(0,100));
    };
    console.log(roll);
    //const canvas = this.refs.canvas;
    const ctx = this.canvas.current.getContext("2d");
    const myHead = new Image();
    var myEyes = new Image();
    var myHat = new Image();
    var myHairBack = new Image();
    var myHairFront = new Image();
    var myMouth = new Image();
    var myBg = new Image();
    var redEyes = {
          1:"images/eyes/red/eye001.svg",
          2:"images/eyes/red/eye002.svg",
          3:"images/eyes/red/eye003.svg",
          4:"images/eyes/red/eye004.svg",
          5:"images/eyes/red/eye005.svg",
          6:"images/eyes/red/eye006.svg",
          7:"images/eyes/red/eye007.svg",
          8:"images/eyes/red/eye008.svg",
          9:"images/eyes/red/eye009.svg",
          10:"images/eyes/red/eye010.svg",
        };
        var blueEyes = {
          1:"images/eyes/blue/eye001.svg",
          2:"images/eyes/blue/eye002.svg",
          3:"images/eyes/blue/eye003.svg",
          4:"images/eyes/blue/eye004.svg",
          5:"images/eyes/blue/eye005.svg",
          6:"images/eyes/blue/eye006.svg",
          7:"images/eyes/blue/eye007.svg",
          8:"images/eyes/blue/eye008.svg",
          9:"images/eyes/blue/eye009.svg",
          10:"images/eyes/blue/eye010.svg",
        };
        var greenEyes = {
          1:"images/eyes/green/eye001.svg",
          2:"images/eyes/green/eye002.svg",
          3:"images/eyes/green/eye003.svg",
          4:"images/eyes/green/eye004.svg",
          5:"images/eyes/green/eye005.svg",
          6:"images/eyes/green/eye006.svg",
          7:"images/eyes/green/eye007.svg",
          8:"images/eyes/green/eye008.svg",
          9:"images/eyes/green/eye009.svg",
          10:"images/eyes/green/eye010.svg",
        };
        var pinkEyes = {
          1:"images/eyes/pink/eye001.svg",
          2:"images/eyes/pink/eye002.svg",
          3:"images/eyes/pink/eye003.svg",
          4:"images/eyes/pink/eye004.svg",
          5:"images/eyes/pink/eye005.svg",
          6:"images/eyes/pink/eye006.svg",
          7:"images/eyes/pink/eye007.svg",
          8:"images/eyes/pink/eye008.svg",
          9:"images/eyes/pink/eye009.svg",
          10:"images/eyes/pink/eye010.svg",
        };
        var purpleEyes = {
          1:"images/eyes/purple/eye001.svg",
          2:"images/eyes/purple/eye002.svg",
          3:"images/eyes/purple/eye003.svg",
          4:"images/eyes/purple/eye004.svg",
          5:"images/eyes/purple/eye005.svg",
          6:"images/eyes/purple/eye006.svg",
          7:"images/eyes/purple/eye007.svg",
          8:"images/eyes/purple/eye008.svg",
          9:"images/eyes/purple/eye009.svg",
          10:"images/eyes/purple/eye010.svg",
        };

        var redHairBack ={
          1:"images/hairback/red/hb001.svg",
          2:"images/hairback/red/hb002.svg",
          3:"images/hairback/red/hb003.svg",
          4:"images/hairback/red/hb004.svg",
          5:"images/hairback/red/hb005.svg",
          6:"images/hairback/red/hb006.svg",
          7:"images/hairback/red/hb007.svg",
          8:"images/hairback/red/hb008.svg",
          9:"images/hairback/red/hb009.svg",
          10:"images/hairback/red/hb010.svg",
        }
        var blueHairBack ={
          1:"images/hairback/blue/hb001.svg",
          2:"images/hairback/blue/hb002.svg",
          3:"images/hairback/blue/hb003.svg",
          4:"images/hairback/blue/hb004.svg",
          5:"images/hairback/blue/hb005.svg",
          6:"images/hairback/blue/hb006.svg",
          7:"images/hairback/blue/hb007.svg",
          8:"images/hairback/blue/hb008.svg",
          9:"images/hairback/blue/hb009.svg",
          10:"images/hairback/blue/hb010.svg",
        }
        var greenHairBack ={
          1:"images/hairback/green/hb001.svg",
          2:"images/hairback/green/hb002.svg",
          3:"images/hairback/green/hb003.svg",
          4:"images/hairback/green/hb004.svg",
          5:"images/hairback/green/hb005.svg",
          6:"images/hairback/green/hb006.svg",
          7:"images/hairback/green/hb007.svg",
          8:"images/hairback/green/hb008.svg",
          9:"images/hairback/green/hb009.svg",
          10:"images/hairback/green/hb010.svg",
        }
        var pinkHairBack ={
          1:"images/hairback/pink/hb001.svg",
          2:"images/hairback/pink/hb002.svg",
          3:"images/hairback/pink/hb003.svg",
          4:"images/hairback/pink/hb004.svg",
          5:"images/hairback/pink/hb005.svg",
          6:"images/hairbackhairback/pink/hb006.svg",
          7:"images/hairback/pink/hb007.svg",
          8:"images/hairback/pink/hb008.svg",
          9:"images/hairback/pink/hb009.svg",
          10:"images/hairback/pink/hb010.svg",
        }
        var purpleHairBack ={
          1:"images/hairback/purple/hb001.svg",
          2:"images/hairback/purple/hb002.svg",
          3:"images/hairback/purple/hb003.svg",
          4:"images/hairback/purple/hb004.svg",
          5:"images/hairback/purple/hb005.svg",
          6:"images/hairback/purple/hb006.svg",
          7:"images/hairback/purple/hb007.svg",
          8:"images/hairback/purple/hb008.svg",
          9:"images/hairback/purple/hb009.svg",
          10:"images/hairback/purple/hb010.svg",
        }
        var redHairFront = {
          1:"images/hairfront/red/hf001.svg",
          2:"images/hairfront/red/hf002.svg",
          3:"images/hairfront/red/hf003.svg",
          4:"images/hairfront/red/hf004.svg",
          5:"images/hairfront/red/hf005.svg",
          6:"images/hairfront/red/hf006.svg",
          7:"images/hairfront/red/hf007.svg",
          8:"images/hairfront/red/hf008.svg",
          9:"images/hairfront/red/hf009.svg",
          10:"images/hairfront/red/hf010.svg",
        };
        var blueHairFront = {
          1:"images/hairfront/blue/hf001.svg",
          2:"images/hairfront/blue/hf002.svg",
          3:"images/hairfront/blue/hf003.svg",
          4:"images/hairfront/blue/hf004.svg",
          5:"images/hairfront/blue/hf005.svg",
          6:"images/hairfront/blue/hf006.svg",
          7:"images/hairfront/blue/hf007.svg",
          8:"images/hairfront/blue/hf008.svg",
          9:"images/hairfront/blue/hf009.svg",
          10:"images/hairfront/blue/hf010.svg",
        };
        var greenHairFront = {
          1:"images/hairfront/green/hf001.svg",
          2:"images/hairfront/green/hf002.svg",
          3:"images/hairfront/green/hf003.svg",
          4:"images/hairfront/green/hf004.svg",
          5:"images/hairfront/green/hf005.svg",
          6:"images/hairfront/green/hf006.svg",
          7:"images/hairfront/green/hf007.svg",
          8:"images/hairfront/green/hf008.svg",
          9:"images/hairfront/green/hf009.svg",
          10:"images/hairfront/green/hf010.svg",
        };
        var pinkHairFront = {
          1:"images/hairfront/pink/hf001.svg",
          2:"images/hairfront/pink/hf002.svg",
          3:"images/hairfront/pink/hf003.svg",
          4:"images/hairfront/pink/hf004.svg",
          5:"images/hairfront/pink/hf005.svg",
          6:"images/hairfront/pink/hf006.svg",
          7:"images/hairfront/pink/hf007.svg",
          8:"images/hairfront/pink/hf008.svg",
          9:"images/hairfront/pink/hf009.svg",
          10:"images/hairfront/pink/hf010.svg",
        };
        var purpleHairFront = {
          1:"images/hairfront/purple/hf001.svg",
          2:"images/hairfront/purple/hf002.svg",
          3:"images/hairfront/purple/hf003.svg",
          4:"images/hairfront/purple/hf004.svg",
          5:"images/hairfront/purple/hf005.svg",
          6:"images/hairfront/purple/hf006.svg",
          7:"images/hairfront/purple/hf007.svg",
          8:"images/hairfront/purple/hf008.svg",
          9:"images/hairfront/purple/hf009.svg",
          10:"images/hairfront/purple/hf010.svg",
        };
        var headType = {
          1:"images/head/headstyle001.svg",
          2:"images/head/headstyle002.svg",
          3:"images/head/headstyle003.svg",
        };
        var mouthType = {
          1:"images/mouth/mouth001.svg",
          2:"images/mouth/mouth002.svg",
          3:"images/mouth/mouth003.svg",
          4:"images/mouth/mouth004.svg",
          5:"images/mouth/mouth005.svg",
          6:"images/mouth/mouth006.svg",
          7:"images/mouth/mouth007.svg",
          8:"images/mouth/mouth008.svg",
          9:"images/mouth/mouth009.svg",
          10:"images/mouth/mouth010.svg",
        };
        var hats = {
          1:"images/hat/hat001.svg",
          2:"images/hat/hat002.svg",
          3:"images/hat/hat003.svg",
          4:"images/hat/hat004.svg",
          5:"images/hat/hat005.svg",
          6:"images/hat/hat006.svg",
          7:"images/hat/hat007.svg",
          8:"images/hat/hat008.svg",
          9:"images/hat/hat009.svg",
          10:"images/hat/hat010.svg",
        };
        var backGrounds = {
          1:"images/background/blue.svg",
          2:"images/background/green.svg",
          3:"images/background/green02.svg",
          4:"images/background/purple.svg",
          5:"images/background/yellow.svg"
        };
        var eyeColor = roll[0];
        var eyeStyle = roll[1];
        var hairColor = roll[2];
        var hairStyleBack = roll[3];
        var hairStyleFront = roll[4];
        var head = roll[5];
        var mouth = roll[6];
        let hasHat = roll[7] >=50 ? true
          : false;
        var hatStyle = roll[8];
        myMouth.src = mouth <=30 ? mouthType[1]
          : mouth <=40 ? mouthType[2]
          : mouth <=50 ? mouthType[3]
          : mouth <=60 ? mouthType[4]
          : mouth <=70 ? mouthType[5]
          : mouth <=80 ? mouthType[8]
          : mouth <=90 ? mouthType[10]
          : mouth <=95 ? mouthType[7]
          : mouth <=98 ? mouthType[6]
          : mouthType[9];
        myHat.src = hasHat === true && hatStyle <= 10 ? hats[3]
          : hasHat === true && hatStyle <=20 ? hats[5]
          : hasHat === true && hatStyle <=30 ? hats[6]
          : hasHat === true && hatStyle <=50 ? hats[7]
          : hasHat === true && hatStyle <=70 ? hats[2]
          : hasHat === true && hatStyle <=85 ? hats[1]
          : hasHat === true && hatStyle <=90 ? hats[9]
          : hasHat === true && hatStyle <=95 ? hats[4]
          : hasHat === true && hatStyle <=98 ? hats[10]
          : hasHat === true && hatStyle <=100 ? hats[8]
          : "images/hat/empty.svg";

          let imgHairColor = hairColor <=20 ? "red"
            : hairColor <=50 ? "green"
            : hairColor <=80 ? "blue"
            : hairColor <=95 ? "pink"
            : "purple";

          myBg.src = imgHairColor === "red" ? backGrounds[1]
            : imgHairColor === "blue" ? backGrounds[5]
            : imgHairColor === "green" ? backGrounds[4]
            : imgHairColor === "pink" ? backGrounds[3]
            : backGrounds[2];




           let imgEyeColor = eyeColor <= 20 ? "red"
            : eyeColor <=50 ? "green"
            : eyeColor <=80 ? "blue"
            : eyeColor <=95 ? "pink"
            : "purple";

           myEyes.src = (imgEyeColor === "red" && eyeStyle <=15) ? redEyes[1]
            : imgEyeColor === "red" && eyeStyle <=30 ? redEyes[5]
            : imgEyeColor === "red" && eyeStyle <=40 ? redEyes[10]
            : imgEyeColor === "red" && eyeStyle <=50 ? redEyes[9]
            : imgEyeColor === "red" && eyeStyle <=60 ? redEyes[8]
            : imgEyeColor === "red" && eyeStyle <=70 ? redEyes[6]
            : imgEyeColor === "red" && eyeStyle <=80 ? redEyes[4]
            : imgEyeColor === "red" && eyeStyle <=90 ? redEyes[3]
            : imgEyeColor === "red" && eyeStyle <=97 ? redEyes[2]
            : imgEyeColor === "red" && eyeStyle >=97 ? redEyes[7]
            : imgEyeColor === "green" && eyeStyle <=15 ? greenEyes[1]
            : imgEyeColor === "green" && eyeStyle <=30 ? greenEyes[5]
            : imgEyeColor === "green" && eyeStyle <=40 ? greenEyes[10]
            : imgEyeColor === "green" && eyeStyle <=50 ? greenEyes[9]
            : imgEyeColor === "green" && eyeStyle <=60 ? greenEyes[8]
            : imgEyeColor === "green" && eyeStyle <=70 ? greenEyes[6]
            : imgEyeColor === "green" && eyeStyle <=80 ? greenEyes[4]
            : imgEyeColor === "green" && eyeStyle <=90 ? greenEyes[3]
            : imgEyeColor === "green" && eyeStyle <=97 ? greenEyes[2]
            : imgEyeColor === "green" && eyeStyle >=97 ? greenEyes[7]
            : imgEyeColor === "blue" && eyeStyle <=15 ? blueEyes[1]
            : imgEyeColor === "blue" && eyeStyle <=30 ? blueEyes[5]
            : imgEyeColor === "blue" && eyeStyle <=40 ? blueEyes[10]
            : imgEyeColor === "blue" && eyeStyle <=50 ? blueEyes[9]
            : imgEyeColor === "blue" && eyeStyle <=60 ? blueEyes[8]
            : imgEyeColor === "blue" && eyeStyle <=70 ? blueEyes[6]
            : imgEyeColor === "blue" && eyeStyle <=80 ? blueEyes[4]
            : imgEyeColor === "blue" && eyeStyle <=90 ? blueEyes[3]
            : imgEyeColor === "blue" && eyeStyle <=97 ? blueEyes[2]
            : imgEyeColor === "blue" && eyeStyle >=97 ? blueEyes[7]
            : imgEyeColor === "pink" && eyeStyle <=15 ? pinkEyes[1]
            : imgEyeColor === "pink" && eyeStyle <=30 ? pinkEyes[5]
            : imgEyeColor === "pink" && eyeStyle <=40 ? pinkEyes[10]
            : imgEyeColor === "pink" && eyeStyle <=50 ? pinkEyes[9]
            : imgEyeColor === "pink" && eyeStyle <=60 ? pinkEyes[8]
            : imgEyeColor === "pink" && eyeStyle <=70 ? pinkEyes[6]
            : imgEyeColor === "pink" && eyeStyle <=80 ? pinkEyes[4]
            : imgEyeColor === "pink" && eyeStyle <=90 ? pinkEyes[3]
            : imgEyeColor === "pink" && eyeStyle <=97 ? pinkEyes[2]
            : imgEyeColor === "pink" && eyeStyle >=97 ? pinkEyes[7]
            : imgEyeColor === "purple" && eyeStyle <=15 ? purpleEyes[1]
            : imgEyeColor === "purple" && eyeStyle <=30 ? purpleEyes[5]
            : imgEyeColor === "purple" && eyeStyle <=40 ? purpleEyes[10]
            : imgEyeColor === "purple" && eyeStyle <=50 ? purpleEyes[9]
            : imgEyeColor === "purple" && eyeStyle <=60 ? purpleEyes[8]
            : imgEyeColor === "purple" && eyeStyle <=70 ? purpleEyes[6]
            : imgEyeColor === "purple" && eyeStyle <=80 ? purpleEyes[4]
            : imgEyeColor === "purple" && eyeStyle <=90 ? purpleEyes[3]
            : imgEyeColor === "purple" && eyeStyle <=97 ? purpleEyes[2]
            : purpleEyes[7];

            myHairBack.src = (imgHairColor === "red" && hairStyleBack <=20) ? redHairBack[2]
             : imgHairColor === "red" && hairStyleBack <=40 ? redHairBack[8]
             : imgHairColor === "red" && hairStyleBack <=50 ? redHairBack[10]
             : imgHairColor === "red" && hairStyleBack <=60 ? redHairBack[6]
             : imgHairColor === "red" && hairStyleBack <=70 ? redHairBack[5]
             : imgHairColor === "red" && hairStyleBack <=80 ? redHairBack[1]
             : imgHairColor === "red" && hairStyleBack <=87 ? redHairBack[7]
             : imgHairColor === "red" && hairStyleBack <=92 ? redHairBack[9]
             : imgHairColor === "red" && hairStyleBack <=97 ? redHairBack[3]
             : imgHairColor === "red" && hairStyleBack >=97 ? redHairBack[4]
             : imgHairColor === "green" && hairStyleBack <=20 ? greenHairBack[2]
             : imgHairColor === "green" && hairStyleBack <=40 ? greenHairBack[8]
             : imgHairColor === "green" && hairStyleBack <=50 ? greenHairBack[10]
             : imgHairColor === "green" && hairStyleBack <=60 ? greenHairBack[6]
             : imgHairColor === "green" && hairStyleBack <=70 ? greenHairBack[5]
             : imgHairColor === "green" && hairStyleBack <=80 ? greenHairBack[1]
             : imgHairColor === "green" && hairStyleBack <=87 ? greenHairBack[7]
             : imgHairColor === "green" && hairStyleBack <=92 ? greenHairBack[9]
             : imgHairColor === "green" && hairStyleBack <=97 ? greenHairBack[3]
             : imgHairColor === "green" && hairStyleBack >=97 ? greenHairBack[4]
             : imgHairColor === "blue" && hairStyleBack <=20 ? blueHairBack[2]
             : imgHairColor === "blue" && hairStyleBack <=40 ? blueHairBack[8]
             : imgHairColor === "blue" && hairStyleBack <=50 ? blueHairBack[10]
             : imgHairColor === "blue" && hairStyleBack <=60 ? blueHairBack[6]
             : imgHairColor === "blue" && hairStyleBack <=70 ? blueHairBack[5]
             : imgHairColor === "blue" && hairStyleBack <=80 ? blueHairBack[1]
             : imgHairColor === "blue" && hairStyleBack <=87 ? blueHairBack[7]
             : imgHairColor === "blue" && hairStyleBack <=92 ? blueHairBack[9]
             : imgHairColor === "blue" && hairStyleBack <=97 ? blueHairBack[3]
             : imgHairColor === "blue" && hairStyleBack >=97 ? blueHairBack[4]
             : imgHairColor === "pink" && hairStyleBack <=20 ? pinkHairBack[2]
             : imgHairColor === "pink" && hairStyleBack <=40 ? pinkHairBack[8]
             : imgHairColor === "pink" && hairStyleBack <=50 ? pinkHairBack[10]
             : imgHairColor === "pink" && hairStyleBack <=60 ? pinkHairBack[6]
             : imgHairColor === "pink" && hairStyleBack <=70 ? pinkHairBack[5]
             : imgHairColor === "pink" && hairStyleBack <=80 ? pinkHairBack[1]
             : imgHairColor === "pink" && hairStyleBack <=87 ? pinkHairBack[7]
             : imgHairColor === "pink" && hairStyleBack <=92 ? pinkHairBack[9]
             : imgHairColor === "pink" && hairStyleBack <=97 ? pinkHairBack[3]
             : imgHairColor === "pink" && hairStyleBack >=97 ? pinkHairBack[4]
             : imgHairColor === "purple" && hairStyleBack <=20 ? purpleHairBack[2]
             : imgHairColor === "purple" && hairStyleBack <=40 ? purpleHairBack[8]
             : imgHairColor === "purple" && hairStyleBack <=50 ? purpleHairBack[10]
             : imgHairColor === "purple" && hairStyleBack <=60 ? purpleHairBack[6]
             : imgHairColor === "purple" && hairStyleBack <=70 ? purpleHairBack[5]
             : imgHairColor === "purple" && hairStyleBack <=80 ? purpleHairBack[1]
             : imgHairColor === "purple" && hairStyleBack <=87 ? purpleHairBack[7]
             : imgHairColor === "purple" && hairStyleBack <=92 ? purpleHairBack[9]
             : imgHairColor === "purple" && hairStyleBack <=97 ? purpleHairBack[3]
             : purpleHairBack[4];

          myHairFront.src = (imgHairColor === "red" && hairStyleFront <=20) ? redHairFront[1]
              : imgHairColor === "red" && hairStyleBack <=40 ? redHairFront[2]
              : imgHairColor === "red" && hairStyleBack <=50 ? redHairFront[10]
              : imgHairColor === "red" && hairStyleBack <=60 ? redHairFront[6]
              : imgHairColor === "red" && hairStyleBack <=70 ? redHairFront[5]
              : imgHairColor === "red" && hairStyleBack <=80 ? redHairFront[3]
              : imgHairColor === "red" && hairStyleBack <=87 ? redHairFront[9]
              : imgHairColor === "red" && hairStyleBack <=92 ? redHairFront[8]
              : imgHairColor === "red" && hairStyleBack <=97 ? redHairFront[7]
              : imgHairColor === "red" && hairStyleBack >=97 ? redHairFront[4]
              : imgHairColor === "blue" && hairStyleBack >=20 ? blueHairFront[1]
              : imgHairColor === "blue" && hairStyleBack <=40 ? blueHairFront[2]
              : imgHairColor === "blue" && hairStyleBack <=50 ? blueHairFront[10]
              : imgHairColor === "blue" && hairStyleBack <=60 ? blueHairFront[6]
              : imgHairColor === "blue" && hairStyleBack <=70 ? blueHairFront[5]
              : imgHairColor === "blue" && hairStyleBack <=80 ? blueHairFront[3]
              : imgHairColor === "blue" && hairStyleBack <=87 ? blueHairFront[9]
              : imgHairColor === "blue" && hairStyleBack <=92 ? blueHairFront[8]
              : imgHairColor === "blue" && hairStyleBack <=97 ? blueHairFront[7]
              : imgHairColor === "blue" && hairStyleBack >=97 ? blueHairFront[4]
              : imgHairColor === "green" && hairStyleBack >=20 ? greenHairFront[1]
              : imgHairColor === "green" && hairStyleBack <=40 ? greenHairFront[2]
              : imgHairColor === "green" && hairStyleBack <=50 ? greenHairFront[10]
              : imgHairColor === "green" && hairStyleBack <=60 ? greenHairFront[6]
              : imgHairColor === "green" && hairStyleBack <=70 ? greenHairFront[5]
              : imgHairColor === "green" && hairStyleBack <=80 ? greenHairFront[3]
              : imgHairColor === "green" && hairStyleBack <=87 ? greenHairFront[9]
              : imgHairColor === "green" && hairStyleBack <=92 ? greenHairFront[8]
              : imgHairColor === "green" && hairStyleBack <=97 ? greenHairFront[7]
              : imgHairColor === "green" && hairStyleBack >=97 ? greenHairFront[4]
              : imgHairColor === "pink" && hairStyleBack >=20 ? pinkHairFront[1]
              : imgHairColor === "pink" && hairStyleBack <=40 ? pinkHairFront[2]
              : imgHairColor === "pink" && hairStyleBack <=50 ? pinkHairFront[10]
              : imgHairColor === "pink" && hairStyleBack <=60 ? pinkHairFront[6]
              : imgHairColor === "pink" && hairStyleBack <=70 ? pinkHairFront[5]
              : imgHairColor === "pink" && hairStyleBack <=80 ? pinkHairFront[3]
              : imgHairColor === "pink" && hairStyleBack <=87 ? pinkHairFront[9]
              : imgHairColor === "pink" && hairStyleBack <=92 ? pinkHairFront[8]
              : imgHairColor === "pink" && hairStyleBack <=97 ? pinkHairFront[7]
              : imgHairColor === "pink" && hairStyleBack >=97 ? pinkHairFront[4]
              : imgHairColor === "purple" && hairStyleBack >=20 ? purpleHairFront[1]
              : imgHairColor === "purple" && hairStyleBack <=40 ? purpleHairFront[2]
              : imgHairColor === "purple" && hairStyleBack <=50 ? purpleHairFront[10]
              : imgHairColor === "purple" && hairStyleBack <=60 ? purpleHairFront[6]
              : imgHairColor === "purple" && hairStyleBack <=70 ? purpleHairFront[5]
              : imgHairColor === "purple" && hairStyleBack <=80 ? purpleHairFront[3]
              : imgHairColor === "purple" && hairStyleBack <=87 ? purpleHairFront[9]
              : imgHairColor === "purple" && hairStyleBack <=92 ? purpleHairFront[8]
              : imgHairColor === "purple" && hairStyleBack <=97 ? purpleHairFront[7]
              : purpleHairFront[4];
    var loaded = false;
        myHead.src = head <=50 ? headType[1]
          : headType[2];

    myBg.onload = () => {
      ctx.drawImage(myBg, 0, 0, 1000, 1000, -250, -100, 2000, 2000);
    };
    myHairBack.onload = () => {
      ctx.drawImage(myHairBack, 0, 0, 1000, 1000, -250, -150, 2000, 2000);
    };
    myHead.onload = () => {
      ctx.drawImage(myHead, 0, 0, 1000, 1000, -250, -150, 2000, 2000);
      ctx.drawImage(myHairFront, 0, 0, 1000, 1000, -250, -150, 2000, 2000);
      ctx.drawImage(myEyes, 0, 0, 1000, 1000, -250, -150, 2000, 2000);
      ctx.drawImage(myMouth, 0, 0, 1000, 1000, -250, -150, 2000, 2000);
      ctx.drawImage(myHat, 0, 0, 1000, 1000, -250, -150, 2000, 2000);
      //this.getDataURL();
      //this.getBlob();
      //this.makeBuffer();
    };

  };


getBlob = async () => {
  const blob = await new Promise(resolve => this.canvas.current.toBlob(resolve, 'image/png'));
  console.log(blob);
  const file = [new File([blob], "image.png", {type: "image/png"})];
  const client = makeStorageClient();
  this.setState({message: "Storing image to IPFS/Filecoin"})
  const cid = await client.put(file);
  console.log('stored files with cid:', cid);
  this.setState({cid: cid});
  this.setState({message: "Success...  Minting your avatar..."})
  const accounts = await web3.eth.getAccounts();
  await minty.methods.mint(cid, accounts[0]).send({
    from: accounts[0],
    value: 100000000000000000
  });
  this.setState({message: "Nice!  We did it!"});
};

//  makeFileFromBlob = async () => {
//    const canvas = this.refs.cavas;
//    const blob = await new Promise(resolve => canvas.toBlob(resolve));
//    const file = new File([blob], "image.png", {type: "image/png"});
//    console.log(file);
//  }
  getDataURL = async () => {
    const canvas = this.canvas.current;
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.href= canvas.toDataURL();
    const myURI = a;
    console.log(myURI);
    const myBlob = await (await fetch(myURI)).blob()
    console.log(myBlob);
    this.setState({uri: myURI});
  };

  makeBuffer = () => {
    const canvas = this.canvas.current;
    const str = this.canvas.current.toDataURL();
    const myBuffer = Buffer.from(str, 'base64');
    console.log(myBuffer);
  }

  makeSmiley = () => {
    const img = './images/smile.png';
  }
  makeAndStoreFile = async () => {
    const imageFile = new File([this.state.blob], "image.png", {type: "image/png"});
    console.log(imageFile);
    this.setState({file: imageFile});
    const client = makeStorageClient();
    const cid = await client.put(imageFile);
    console.log('stored files with cd', cid)
    this.setState({cid: cid});
    return cid;
  };
  storeFiles = async (event) => {
    const client = makeStorageClient();
    const cid = await client.put(this.state.file);
    console.log('stored files with cid:', cid);
    return cid;
    this.setState({cid: cid});
  }
  onClick = async (event) => {
    //const canvas = this.refs.canvas;
    //const blob = await new Promise(resolve => this.canvas.current.toBlob(resolve, 'image/png'));
    event.preventDefault();
    this.getBlob();
    //event.preventDefault();
  };

  getNFT = async (event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]});
    const account = this.state.account;
    const token = await minty.methods.tokenOfOwnerByIndex(account, 0).call();
    console.log("Your token index: ", token);
    const hash = await minty.methods.tokenURI(token).call();
    const baseURL = hash.replace("ifps://", "https://") + ".ipfs.dweb.link/image.png";
    console.log("Your NFT on IPFS: ", baseURL);
    this.setState({img: baseURL});
  }

  render () {
    const bal = this.state.bal;
    if (!bal) {
      return (
        <div>
          <h3 className="h"><img src="images/bg.png" width={100}></img></h3>
          <canvas
           ref={this.canvas}
           width={500}
           height={500}
           className="canvas"
           />
           <div className="btnContainer">
           <div>{this.state.owned}</div><br></br>
           <div className="button" onClick={this.onClick}>Mint!!!</div><br></br>
           {this.state.message}
           </div>
           </div>
         );
        } else {
          return (
            <div>
            <h3 className="h">Account details:</h3>
            <div className="account">
            <div><img src={this.state.img} className="cutout"></img></div>
            {this.state.address}
            </div>
            <div className="box"><img src="images/bg.png" width={250}></img><br></br>Welcome back!</div>
            <canvas ref={this.canvas}
            width={1}
            className="canvas" />
            </div>
          );
        }
      }
    }
  export default Canvas;
