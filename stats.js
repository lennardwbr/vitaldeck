// Besucherstatistik mit GoatCounter (ohne Cookies, keine IP-Speicherung).
// Eigene Besuche ausschließen: einmal pro Browser die Seite mit #nicht-zaehlen öffnen.
// Rückgängig: Seite mit #zaehlen öffnen.
(function(){
  var GOATCOUNTER_CODE = "vitaldeck"; // Name des GoatCounter-Kontos (CODE.goatcounter.com)
  var KEY = "vitaldeck-nicht-zaehlen";
  var skip = false, note = "";
  var en = (document.documentElement.lang || "").indexOf("en") === 0;
  try{
    if(location.hash === "#nicht-zaehlen"){
      localStorage.setItem(KEY, "1");
      note = en ? "This browser is no longer counted." : "Dieser Browser wird ab jetzt nicht mehr gezählt.";
    }else if(location.hash === "#zaehlen"){
      localStorage.removeItem(KEY);
      note = en ? "This browser is counted again." : "Dieser Browser wird wieder gezählt.";
      skip = true; // diesen Aufruf selbst nicht zählen
    }
    if(localStorage.getItem(KEY) === "1") skip = true;
  }catch(e){}

  if(note){
    try{ history.replaceState(null, "", location.pathname + location.search); }catch(e){}
    var show = function(){
      var d = document.createElement("div");
      d.setAttribute("role", "status");
      d.textContent = note;
      d.style.cssText = "position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:9999;max-width:calc(100% - 32px);padding:10px 16px;border-radius:10px;background:#111827;color:#fff;font:inherit;font-size:.95rem;box-shadow:0 4px 16px rgba(0,0,0,.25)";
      document.body.appendChild(d);
      setTimeout(function(){ d.remove(); }, 5000);
    };
    if(document.body) show(); else document.addEventListener("DOMContentLoaded", show);
  }

  if(skip || !GOATCOUNTER_CODE) return;
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://" + GOATCOUNTER_CODE + ".goatcounter.com/count");
  document.head.appendChild(s);
})();
