exports.getHomePage = (req,res)=>{
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
        }]
    });
}

exports.getLocatePage = (req,res)=>{
    res.render('locateCompany');
}
