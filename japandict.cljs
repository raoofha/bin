#!/usr/bin/env lumo

(let [child-process (js/require "child_process")
      exec (.-exec child-process)
      fs (js/require "fs")
      word (get (.-argv js/process) 3)
      f (str "/opt/dict/japandict/" word ".ogg")
      adr (js/encodeURI (str "https://www.japandict.com/voice/read?text=" word "&outputFormat=ogg_vorbis"))
      curl-str (str "curl --create-dirs -sfo " f " \"" adr "\"")
      ;_ (print curl-str)
      play #(exec (str "mplayer -volume 40 " f))]
  ;(.notify (js/require "node-notifier") "yes")
  (if (.existsSync fs f)
    (play)
    (exec curl-str play)
    )
  )
