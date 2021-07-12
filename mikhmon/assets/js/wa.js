function sendWA(){
    var WAnum = document.getElementById("WAnum").value;
    var WAtext = document.getElementById("WAtext").value;
    var getNum = WAnum.substring(1,14);
    var apiURL= "whatsapp://send";
    if(!WAnum){
        alert("Silakan isi no WA terlebih dahulu")
    }else{
        document.getElementById("sWAclose").click()
        window.location.href = apiURL+"?phone=62"+getNum+"&text="+WAtext;
    }
}

var _0xb8b2=["\x76\x61\x6C\x75\x65","\x57\x41\x6E\x75\x6D","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x57\x41\x74\x65\x78\x74","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x77\x68\x61\x74\x73\x61\x70\x70\x3A\x2F\x2F\x73\x65\x6E\x64","\x53\x69\x6C\x61\x6B\x61\x6E\x20\x69\x73\x69\x20\x6E\x6F\x20\x57\x41\x20\x74\x65\x72\x6C\x65\x62\x69\x68\x20\x64\x61\x68\x75\x6C\x75","\x63\x6C\x69\x63\x6B","\x73\x57\x41\x63\x6C\x6F\x73\x65","\x68\x72\x65\x66","\x6C\x6F\x63\x61\x74\x69\x6F\x6E","\x3F\x70\x68\x6F\x6E\x65\x3D\x36\x32","\x26\x74\x65\x78\x74\x3D"];function sendWA(){var _0x3691x2=document[_0xb8b2[2]](_0xb8b2[1])[_0xb8b2[0]];var _0x3691x3=document[_0xb8b2[2]](_0xb8b2[3])[_0xb8b2[0]];var _0x3691x4=_0x3691x2[_0xb8b2[4]](1,14);var _0x3691x5=_0xb8b2[5];if(!_0x3691x2){alert(_0xb8b2[6])}else {document[_0xb8b2[2]](_0xb8b2[8])[_0xb8b2[7]]();window[_0xb8b2[10]][_0xb8b2[9]]= _0x3691x5+ _0xb8b2[11]+ _0x3691x4+ _0xb8b2[12]+ _0x3691x3}}