package auth

import (
	"fmt"
	"net/http"
)

func basic(handler http.HandlerFunc,username,password string)http.HandlerFunc{
	return func(w http.ResponseWriter,r *http.Request){
		user,pass,ok:=r.BasicAuth()
		if !ok||user!=username||pass!=password{
			w.Header().Set("WWW-Authenticate",`Basic realm="Restrited"`)
			w.WriteHeader(401)
			w.Write([]byte("Unauthorized.\n"))
			return
		}
		handler(w,r)
	}
}

func handler(w http.ResponseWriter,r *http.Request){
	fmt.Fprintf(w,"Hello,World!")
}