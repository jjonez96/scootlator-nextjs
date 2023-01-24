# Scootlator

This is the new version of this app. Old version was build with CRA "Create React App" and this new one is build with Next.js. <br>
Link to old repo: https://github.com/jjonez96/Scootlator

There is also Typescript version of this app which is still in progress. Check out other branch.

Scootlator is really handy and fast PWA application to calculate e-scoot trips such as Tier, Voi, Dott etc. <br>
You can download the app for your device or use it in the browser. 
<br>
<b>Preview:</b> <br>
https://scootlator.vercel.app <br> <br>
![image](https://user-images.githubusercontent.com/90967564/213917687-672d0bf4-51c4-4dab-b674-756a93db15f7.png)
<br>
<b>Desktop view</b>


![image](https://user-images.githubusercontent.com/90967564/213919431-c5cf2c40-a620-46d8-90bf-b1b35ec6cdcf.png)'
<br>
<b>Mobile view</b>
## Tech Stack:

![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) <br>
![](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)<br>
![](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) <br>
![](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) <br>
![](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## API's

- Google maps API (map, places and autocomplete)
- Tier API
- Voi API

## How it works?

In Scootlator you choose your origin and destination where you want to go from point A to point B.

There is different ways to get origin and destination. Mostly used method is to just write them and Google Autocomplete gives you suggestions based on where you are located. You can choose the destination by clicking the map or just write it. <br> When origin and destination are selected then you choose your operator which shows their prices and then you are ready to calculate the price.

<b>Other ways to get origin:</b>

1. Click location button in origin input. This button takes you to your location.

![Näyttökuva 2022-12-22 181459](https://user-images.githubusercontent.com/90967564/209176819-19fb4a83-9402-438d-8359-3815dbcfcf1c.png)

2. Pick scoot from the map and click the location button.

![image](https://user-images.githubusercontent.com/90967564/210266502-39440ba6-5d85-405e-9fed-51ecb21ad737.png)
<br>
<b>You can find scoots in Örebro Sweden only at the moment.</b> <br>
<b>When you click scoot icon in the map you see information of that scoot:</b>

- What type of vehicle.
- Battery left.
- Location button. This gives you that selected scoot address to origin input.
- "Vuokraa" means Rent and that button takes you to the Tier or Voi app where you can make the payment.

---
<br>

Blue settings button has 2 swtiches. "Scootit kartassa" means Scoots in map which disables all scoots in the map. <br>
Right side that red button will reset the whole app. <br>
![image](https://user-images.githubusercontent.com/90967564/213917852-ba892c93-28f4-43e2-8add-a0778ebc3067.png)

Scoot trip price comes from minuteprice and startprice. <br> Startprice for operators is usually 1€ in Finland and minuteprice depends what operator you use but the minute pricerange is about 0,20€ - 0,27€.

"Muu hinta" means other price and that changes select input to number input. Then you can write your minuteprice manually. <br>
![image](https://user-images.githubusercontent.com/90967564/213918296-900fa1bc-8b9a-421c-82e1-02c46a3309df.png)


---
<br>

When the trip is calculated the app will return you the results like distance, duration and the price of that trip. <br>
Here in Finland all scoot operators will slow down scoots at night times and the trip price will obviously increase. Price is increased at 10PM - 6AM


![image](https://user-images.githubusercontent.com/90967564/210266547-487ead7b-db42-4cf8-b76b-11d88939dc41.png)

---
<br>

Scootdata comes from my Node.js backend. It is server to server solution where i do http requests from tier and voiapi. The Node application is hosted to Cyclic.sh.

<b>Here is the backend repo:<b> <br>
https://github.com/jjonez96/scootdata

## Issues

There are still alot of problems what im trying to solve yet for example scoot locations. Other issues are listed in Github issues section.


## What i´ve learned so far?

- Making rest api´s with Node.js
- Creating http and post reqests in Node.
- Cleaning the useless data from api in Node.
- Hosting Node.js application
- CORS error handling
- UI/UX work(Making the app userfriendly as possible and responsive)
- Making UI with React Bootstrap.
- Overwriting Bootstrap styles.
- Customise the Googlemap colorscheme
- onClick events & onChange events.
- Scoot operator selector(using onChange)
- Making loading screen.
- Setting up Googlemaps API to the React project.
- Setting up Googlemaps AutoComplete, Places and MarkerClusterer.
- How to find user location.
- Render coordinates to input field.
- Fetching the data from backend to frontend
- How to map array of markers to Googlemaps
- Changing coordinates to address.
- Coordinates from map click.
- Render section when button is clicked(calculationResults component)
- Using ternary operators instead of if else.
- Input validation and error handling.
- Resetting the app without refreshing the page.
- On/off switch for scoots in map.
- How to use UseRef, UseState, UseEffect hooks.
- Passing props between components.
- Making own customhooks.
- Algorithm for the scoot price.
- Changing the codebase form CRA to Next.js.
- Performance issue handling(minimizing api loading time. Next.js useSWR hook).
- How to Create a PWA With Next.js.
- Git commands (commit, push and pull).
- npm commands (Adding dependencies, npm start and npm run build).

## Next goals for this project

I'm going to look forward on adding Typescript to this project later.
