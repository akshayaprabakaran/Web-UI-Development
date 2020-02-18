exports.getHomePage = (req,res)=>{
    console.log("req Query",req.query)
    res.render('jobtrackapp',{
        "companies" : [{
            name : "Pinterest",
            checked : "checked"
        },{
            name : "Synopsys",
            checked : ""
            
        },{
            name : "Walmart",
            checked : "checked"
        },{
            name : "Rakuten",
            checked : ""
        },{
            name : "Facebook",
            checked : ""
        }],
        "query" : req.query
    });
}

exports.getLocatePage = (req,res)=>{
    res.render('locateCompany');
}

exports.uploadResume = (req,res)=>{
    console.log(req.file,req.query,req.params);
    if(!!req.query && !!req.query.img && !!req.query.img){
        res.redirect('/?upload=success');
    }else{
        res.redirect('/?upload=failure');
    }
    
}
