package main

import (
	"bytes"
	"html"
	"math/rand"
	"net/http"
	"os"
	"strconv"
	"text/template"
	"time"
)

type ReadmeContent struct {
	http     *http.Client
	Pokemon  *Pokemon
	Articles *[]Article
}

func New(client *http.Client) *ReadmeContent {
	return &ReadmeContent{http: client}
}

func (readme *ReadmeContent) Welcome() string {
	loc, _ := time.LoadLocation("Europe/Amsterdam")
	now := time.Now().In(loc)
	switch {
	case now.Hour() < 12:
		return "Good morning 🌅"
	case now.Hour() < 17:
		return "Good afternoon ☀️"
	default:
		return "Good evening 🌙"
	}
}

func (readme *ReadmeContent) Emoji() string {
	emoji := [][]int{
		// Emoticons icons
		{128513, 128591},
		// Transport and map symbols
		{128640, 128704},
		//Additional Transport
		{128641, 128709},
		//other additional symbols
		{127757, 128359},
	}
	r := emoji[rand.Int()%len(emoji)]
	minUni := r[0]
	maxUni := r[1]
	n := rand.Intn(maxUni-minUni+1) + minUni
	return html.UnescapeString("&#" + strconv.Itoa(n) + ";")
}

func (readme *ReadmeContent) CreateReadme() error {
	tmpl, templateErr := template.New("markdown").Parse(markdownTemplate)
	if templateErr != nil {
		return templateErr
	}
	var output bytes.Buffer
	exeErr := tmpl.Execute(&output, &readme)
	if exeErr != nil {
		return exeErr
	}
	writeErr := os.WriteFile("readme.md", output.Bytes(), 0644)
	if writeErr != nil {
		return writeErr
	}
	return nil
}

const markdownTemplate = `
## {{.Welcome}}

I'm Simon Martyr. 

An Amsterdam 🇳🇱 based web developer who primary focuses on backend technologies.

With an interest for American football, podcasts and mechanical keyboards.

Working for [@Finaps](https://www.finaps.nl/) 

## Social Stuff {{.Emoji}}

[![Mastodon Follow](https://img.shields.io/mastodon/follow/109711119936675780?domain=https%3A%2F%2Ffosstodon.org&style=flat-square&logo=mastodon&logoColor=white&label=Mastodon&labelColor=purple&color=purple)
](https://fosstodon.org/@martyr)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/SiMartyr?style=flat-square&logo=twitter&label=twitter&logoColor=white&labelColor=1ca0f1&color=1ca0f1)
](https://twitter.com/simartyr)

![pokemon]({{.Pokemon.Image}})

## Stats 🤖

[![Git Stats](https://github-readme-stats.vercel.app/api/top-langs/?username=simonmartyr&layout=compact&theme=nightowl)](https://github.com/anuraghazra/github-readme-stats)

## Latest Article 👨🏻‍💻
{{range .Articles}}
### {{ .Title }}
[![article]({{ .Image }})]({{.CanonicalUrl}})
{{end}}
`
