function login() {
          
    const userid = "123";

    console.log("static/login.js login() method ");

    window.location.href="/";

    /*
     * Perform some validation here.
     *      
    $.get("/login",{username:userid},function(data) {  
                
        //console.log("From Authorized API " + data);
        if(data === 'done') {
            //const url = "/login/"+data;
            //window.location.href=url;
        }
      
    });
    */    
    
   /*
    window.hwcrypto.getCertificate({lang: 'en'}).then(function(certificate) {
        // Do something with the certificate, like prepare the hash to be signed
        var hash = calculateSHA256SignatureHashAsHexForCertificate(certificate.hex);
        // Now sign the hash
        window.hwcrypto.sign(certificate, {type: 'SHA-256', hex: hash}, {lang: 'en'}).then(function(signature) {
           // Do something with the signature
           storeSignature(signature.hex);
        }, function(error) {
           // Handle the error. `error.message` is one of the described error mnemonics
           console.log("Signing failed: " + error.message);
        });
    });
    */
}