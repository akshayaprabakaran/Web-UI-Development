exports.getHomePage = (req,res)=>{
    res.render('jobtrackapp',{
        "companies" : [{
            name : "Pinterest",
            checked : "checked"
        },{
            name : "Walmart",
            checked : ""
        },{
            name : "Synopsys",
            checked : ""
        },{
            name : "Rakuten",
            checked : "checked"
        },{
            name : "Facebook",
            checked : ""
        }]
    });
}

exports.getLocatePage = (req,res)=>{
    res.render('locateCompany');
}