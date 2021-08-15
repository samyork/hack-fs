import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";
import ethiopia from './ethiopia';
import minty from './minty';
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js';
import { File } from 'web3.storage/dist/bundle.esm.min.js';
import Canvas from './Canvas';
function getAccessToken() {
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGVkNmZkZkJCZUMxNkU1ZjcwOEI4M2Y1QjNhMzM5MzBDRTkxMGFGMDEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Mjg0OTA2NzY0MzAsIm5hbWUiOiJFdGhpb3BpYXYxIn0.Ny7MnwcSNRv3GEZeQLZmrZNZ4_L3Cac-F_mi9XEh2fg';
}
function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

class App extends React.Component {
  state = {
    name: '',
    postCount: '',
    posts: [],
    value: '',
    contents: '',
    cid: '',
    baseURL: '',
  };
  async componentDidMount() {
    const name = await ethiopia.methods.name().call();
    const postCount = await ethiopia.methods.postCount().call();
    const accounts = await web3.eth.getAccounts();
    for (var i =1; i <= postCount; i++) {
      const post = await ethiopia.methods.posts(i).call();
      this.setState({posts: [...this.state.posts, post]});
    }
    this.setState({name: name});
    this.setState({postCount: postCount});
    const hash = await minty.methods.tokenURI(1).call();
    console.log(hash);
    const baseURL = hash.replace("ifps://", "https://") + ".ipfs.dweb.link/image.png";
    this.setState({baseURL:baseURL});
    console.log(baseURL);
};
makeAndPost = async () => {
  const accounts = await web3.eth.getAccounts();
  const obj = { poster: accounts[0], msg: this.state.contents };
  const postCount = this.state.postCount;
  const preFix = "post";
  const fileType = ".json";
  const thisPost = preFix + postCount + fileType;
  var files = [];
  const buffer = Buffer.from(JSON.stringify(obj));
  files = [
    new File([buffer], thisPost)
  ]
  console.log(files);
  this.setState({message: 'Uploading post to ipfs and Filecoin...'});
  const client = makeStorageClient();
  const cid = await client.put(files);
  this.setState({message: 'Success!'});
  console.log('stored files with cid', cid);
  this.setState({message: 'Posting... Confirm transaction'});
  this.setState({cid: cid});
  const uri = this.state.cid;
  const contents = this.state.contents;
  console.log(uri);
  console.log(contents);
  await ethiopia.methods.createPost(contents, uri).send({
    from: accounts[0],
    value: 1000000000000000
  });
  this.setState({message: 'Success!'});

};
onSubmit = async (event) => {
  event.preventDefault();
  const contents = this.state.value;
  this.setState({contents: contents})
  this.makeAndPost();
};


  render() {
    const posts = this.state.posts.reverse().map(i =>
      <div className="post-card">
      <div className='small'>Posted by: {i.poster}<br></br>Blocktime: {i.timestamp}</div>
      <h1 className='h1'>{i.contents}<br></br></h1>
      <div className='small'>ipfs://{i.uri}</div>
      </div>)

    return (
      <div>
      <div>
      <Canvas />
      </div>
      <form className="form" onSubmit={this.onSubmit}>
        <h4>Make a post:</h4>
        <div>

          <input
          className="input"
          size="100"
          value= {this.state.value}
          onChange= {event => this.setState({value: event.target.value})}
          />
        </div>
        {this.state.message}<br></br>
        <button className="button">Post!</button>
        </form>
<div className="contractInfo"><h2>Welcome to Polytopia.  There are {this.state.postCount} posts so far!</h2>
        {posts}
</div>
</div>
    );
  };
}
export default App;
