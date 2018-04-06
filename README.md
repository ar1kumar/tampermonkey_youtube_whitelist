# tampermonkey_youtube_whitelist
Whitelist videos of specific Youtube channels in uBlock Origin (with tampermonkey)

1. Add this script via TamperMonkey(main.js)
2. Edit the value of variable "fv_channel_name" and add the channelID of the channel you would like to whitelist
3. Save script and enable it.
4. open uBlock Origin settings and goto "whitelist" tab
5. Add the following text in a new line (without the quotes) "youtube.com/*user=CHANNEL_ID" 
6. Replace CHANNEL_ID with your favourite channel id, example:- youtube.com/*user=UCdIaNUarhzLSXGoItz7BHVA
7. Save and close.


