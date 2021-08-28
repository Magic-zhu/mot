class Loader {
    loadUrl(url:string){
        return new Promise((resolve,reject)=>{
          uni.request({
            url: url,
            success:(res)=>{
              resolve(res.data);
            },
            fail:(err)=>{
              console.error(err)
            }
          })
        })
    }
}

export default Loader
