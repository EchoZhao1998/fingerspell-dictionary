# Feedback log

Date: 2026-06-05

## Figma design
IMPORTANT NOTE:
you can read PDF file prototype_0605.pdf first. It almost like what I want to build. Current interface almost like this design. You can discuss practicity with me if you think the design is wrong.
Notice, I use iphone frame. but we are building it as web tool. Hence you need adjust accordingli

following also can be reference, they are same thing.offer here just incase you can better understand me.if you can know what I mean, only by the flatten PDF, it's unneccessary to scan them all.

figma embeded code:
option 1: <iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/68E6OONHFohAeH5nXmguA6/asl-fingerspell-dictionary?node-id=1-3&embed-host=share" allowfullscreen></iframe>

option 2: Dev mode link: https://www.figma.com/design/68E6OONHFohAeH5nXmguA6/asl-fingerspell-dictionary?node-id=1-3&m=dev&t=rJf3GwiHHuvcpAa2-1

option 3: protype link: https://www.figma.com/proto/68E6OONHFohAeH5nXmguA6/asl-fingerspell-dictionary?node-id=1-3&t=rJf3GwiHHuvcpAa2-1

## Review Goal
minimize feature, keep the tool clean and targeted.
Pain point:
- need to practice finger spell daily.
- look up unfamiliar word in dictionary to know its pronunce, meaning, and example sentence.
- know the offical sign of this word if have

- prototype looks like
[ASL speed spell](https://apps.apple.com/us/app/asl-speed-spell/id6458647514) + 
[Dictionary](https://www.merriam-webster.com/) +
ASL dictionary, which like [ASL pocket sign](https://apps.apple.com/us/app/asl-sign-language-pocket-sign/id1519636809), can search how to sign by input text. But due to there is no free public video, I only can link to ASL-LEX webpage.


## Difficulty filter
- Easy: 0.5 speed
- Medium: 1 speed
- Difficult: 1.5 speed
- Advance: 2 speed
- Expert: 3 speed


## Category filter
All words collect from [asl-lex](https://asl-lex.org/visualization/). 
Divided them into 
- Short(≤4 letters)
- Midium([5,7])
- Long(≥7 letters)
so that almost all word can link to specific ASL. This means can always know bith finger spell an ASL. 

## Word counts filter
5, 10, 15, 20

## Error I find
The loop of words, they always repeat same word.
