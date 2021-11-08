class GrabBagRandomizer {
    constructor (arr, noRepeatLength){ // Give me a list of something and tell me the minimum gap you want before a repeat of an item on the list

        this.list = [...arr]; // make a copy of the list to refill the grabBag later
        this.grabBag = [...arr]; // fill the grabBag
        this.noRepeatLength = noRepeatLength; // record the requested size of the "No repeats gap"
        this.removeItems = []; // a place to store object to be removed when the bag is refilled... this is how you prevent repeats!

        this.pullItem = this.pullItem; // define the methods in the constructor so GrabBagRandomizer works with the spread operator
        this.resetBag = this.resetBag;

    }

    pullItem() { // pull an item out of the grabBag and return it

        let pullIndex = Math.floor(Math.random() * this.grabBag.length); // pick the random position of an item in the grabBag
        let pullItem = this.grabBag.splice(pullIndex,1)[0]; // pull that item out of the bag
        this.removeItems.push(pullItem); // add the pulled item to the remove list

        if (this.removeItems.length > this.noRepeatLength) { // if there are more items on the remove list than the size of the desired gap...
            this.removeItems.shift(); // ...remove the oldest
        }

        if (this.grabBag.length === 0) { // if the grabBag is empty...
            this.resetBag(); // ...refill it
        }

        return pullItem; // return the selected item
    }

    resetBag() { // refill the bag and prevent a bag to bag repeat

        this.grabBag = [...this.list]; // refill the bag
        this.removeItems.forEach(element => this.grabBag.splice(this.grabBag.indexOf(element),1)); // pull the last X items so they won't repeat

    }
}

function getNumber(str) {

    let result = ''

    for (let i=0; i<str.length; i++){
        if (!isNaN(str[i])){
            result += str[i];
        } 
    }

    return parseInt(result);

}

let id = 0;
const nextID = () => {
    id++
    return id;
}

const dataArrays = {
    toDoLists: [],
    progressMeters: [],
    accomplishments: [],
    complements: [
        `You look great today.`,
        `I bet you make babies smile.`,
        `You have impeccable manners.`,
        `I like your style.`,
        `You have the best laugh.`,
        `I appreciate you.`,
        `You are the most perfect you there is.`,
        `Our system of inside jokes is so advanced that only you and I get it. And I like that.`,
        `You're strong.`,
        `Your perspective is refreshing.`,
        `You're an awesome friend.`,
        `You light up the room.`,
        `You deserve a hug right now.`,
        `You should be proud of yourself.`,
        `You're more helpful than you realize.`,
        `You have a great sense of humor.`,
        `You've got all the right moves!`,
        `Your kindness is a balm to all who encounter it.`,
        `On a scale from 1 to 10, you're an 11.`,
        `You are brave.`,
        `You're even more beautiful on the inside than you are on the outside.`,
        `You have the courage of your convictions.`,
        `Aside from food. You're my favorite.`,
        `If cartoon bluebirds were real, a bunch of them would be sitting on your shoulders singing right now.`,
        `You are making a difference.`,
        `You're like sunshine on a rainy day.`,
        `You bring out the best in other people.`,
        `Your ability to recall random factoids at just the right time is impressive.`,
        `You're a great listener.`,
        `How is it that you always look great, even in sweatpants?`,
        `Everything would be better if more people were like you!`,
        `I bet you sweat glitter.`,
        `You were cool way before hipsters were cool.`,
        `That color is perfect on you.`,
        `Hanging out with you is always a blast.`,
        `You always know, and say, exactly what I need to hear when I need to hear it.`,
        `You smell really good.`,
        `You may dance like no one's watching, but everyone's watching because you're an amazing dancer!`,
        `Being around you makes everything better!`,
        `When you're not afraid to be yourself is when you're most incredible.`,
        `Colors seem brighter when you're around.`,
        `You're more fun than a ball pit filled with candy. (And seriously, what could be more fun than that?)`,
        `That thing you don't like about yourself is what makes you so interesting.`,
        `You're wonderful.`,
        `Jokes are funnier when you tell them.`,
        `Your bellybutton is kind of adorable.`,
        `Your hair looks stunning.`,
        `You're one of a kind!`,
        `You're inspiring.`,
        `You should be thanked more often. So thank you!!`,
        `Our community is better because you're in it.`,
        `Someone is getting through something hard right now because you've got their back.`,
        `You have the best ideas.`,
        `You always know how to find that silver lining.`,
        `Everyone gets knocked down sometimes, but you always get back up and keep going.`,
        `You're a candle in the darkness.`,
        `You're a great example to others.`,
        `Being around you is like being on a happy little vacation.`,
        `You always know just what to say.`,
        `You're always learning new things and trying to better yourself, which is awesome.`,
        `If someone based an Internet meme on you, it would have impeccable grammar.`,
        `You could survive a Zombie apocalypse.`,
        `You're more fun than bubble wrap.`,
        `When you make a mistake, you fix it.`,
        `Who raised you? They deserve a medal for a job well done.`,
        `You're great at figuring stuff out.`,
        `Your voice is magnificent.`,
        `The people you love are lucky to have you in their lives.`,
        `You're like a breath of fresh air.`,
        `You're gorgeous and that's the least interesting thing about you, too.`,
        `You're so thoughtful.`,
        `Your creative potential seems limitless.`,
        `You're the coolest person I know. And I consider myself bet friends with like all celebrities, so. . . .`,
        `You're irresistible when you blush.`,
        `Actions speak louder than words, and yours tell an incredible story.`,
        `Somehow you make time stop and fly at the same time.`,
        `When you make up your mind about something, nothing stands in your way.`,
        `You seem to really know who you are.`,
        `Any team would be lucky to have you on it.`,
        `I bet you do the crossword puzzle in ink.`,
        `Babies and small animals probably love you.`,
        `If you were a scented candle they'd call it Perfectly Imperfect (and it would smell like summer).`,
        `There's ordinary, and then there's you.`,
        `You're someone's reason to smile.`,
        `You're even better than a unicorn, because you're real.`,
        `How do you keep being so funny and making everyone laugh?`,
        `You have a good head on your shoulders.`,
        `Has anyone ever told you that you have great posture?`,
        `The way you treasure your loved ones is incredible.`,
        `You're really something special.`,
        `You're a gift to those around you.`
    ], // Copied from 'https://thinkkindness.org/all-things-kindness/a-list-of-100-compliments/' and formatted using Excel
    fortunes: [
        'A beautiful, smart, and loving person will be coming into your life.',
        'A dubious friend may be an enemy in camouflage.',
        'A faithful friend is a strong defense.',
        'A feather in the hand is better than a bird in the air. ',
        'A fresh start will put you on your way.',
        'A friend asks only for your time not your money.',
        'A friend is a present you give yourself.',
        'A gambler not only will lose what he has, but also will lose what he doesn’t have.',
        'A golden egg of opportunity falls into your lap this month.',
        'A good friendship is often more important than a passionate romance.',
        'A good time to finish up old tasks. ',
        'A hunch is creativity trying to tell you something.',
        'A lifetime friend shall soon be made.',
        'A lifetime of happiness lies ahead of you.',
        'A light heart carries you through all the hard times.',
        'A new perspective will come with the new year. ',
        'A person is never to (sic) old to learn. ',
        'A person of words and not deeds is like a garden full of weeds.',
        'A pleasant surprise is waiting for you.',
        'A short pencil is usually better than a long memory any day.',
        'A small donation is call for. It’s the right thing to do.',
        'A smile is your personal welcome mat.',
        'A smooth long journey! Great expectations.',
        'A soft voice may be awfully persuasive.',
        'A truly rich life contains love and art in abundance.',
        'Accept something that you cannot change, and you will feel better.',
        'Adventure can be real happiness.',
        'Advice is like kissing. It costs nothing and is a pleasant thing to do. ',
        'Advice, when most needed, is least heeded.',
        'All the effort you are making will ultimately pay off.',
        'All the troubles you have will pass away very quickly.',
        'All will go well with your new project.',
        'All your hard work will soon pay off.',
        'Allow compassion to guide your decisions.',
        'An acquaintance of the past will affect you in the near future.',
        'An agreeable romance might begin to take on the appearance.',
        'An important person will offer you support.',
        'An inch of time is an inch of gold.',
        'Any decision you have to make tomorrow is a good decision.',
        'At the touch of love, everyone becomes a poet.',
        'Be careful or you could fall for some tricks today.',
        'Beauty in its various forms appeals to you. ',
        'Because you demand more from yourself, others respect you deeply.',
        'Believe in yourself and others will too.',
        'Believe it can be done.',
        'Better ask twice than lose yourself once.',
        'Bide your time, for success is near.',
        'Carve your name on your heart and not on marble.',
        'Change is happening in your life, so go with the flow!',
        'Competence like yours is underrated.',
        'Congratulations! You are on your way.',
        'Could I get some directions to your heart? ',
        'Courtesy begins in the home.',
        'Courtesy is contagious.',
        'Curiosity kills boredom. Nothing can kill curiosity.',
        'Dedicate yourself with a calm mind to the task at hand.',
        'Depart not from the path which fate has you assigned.',
        'Determination is what you need now.',
        'Diligence and modesty can raise your social status.',
        'Disbelief destroys the magic.',
        'Distance yourself from the vain.',
        'Do not be intimidated by the eloquence of others.',
        'Do not demand for someone’s soul if you already got his heart.',
        'Do not let ambitions overshadow small success.',
        'Do not make extra work for yourself.',
        'Do not underestimate yourself. Human beings have unlimited potentials.',
        'Do you know that the busiest person has the largest amount of time?',
        'Don’t be discouraged, because every wrong attempt discarded is another step forward.',
        'Don’t confuse recklessness with confidence. ',
        'Don’t just spend time. Invest it.',
        'Don’t just think, act!',
        'Don’t let friends impose on you, work calmly and silently.',
        'Don’t let the past and useless detail choke your existence.',
        'Don’t let your limitations overshadow your talents.',
        'Don’t worry; prosperity will knock on your door soon.',
        'Each day, compel yourself to do something you would rather not do.',
        'Education is the ability to meet life’s situations.',
        'Embrace this love relationship you have!',
        'Emulate what you admire in your parents. ',
        'Emulate what you respect in your friends.',
        'Every flower blooms in its own sweet time.',
        'Every wise man started out by asking many questions.',
        'Everyday in your life is a special occasion.',
        'Everywhere you choose to go, friendly faces will greet you.',
        'Expect much of yourself and little of others.',
        'Failure is the chance to do better next time.',
        'Failure is the path of lease persistence.',
        'Fear and desire – two sides of the same coin.',
        'Fearless courage is the foundation of victory.',
        'Feeding a cow with roses does not get extra appreciation.',
        'First think of what you want to do; then do what you have to do.',
        'Follow the middle path. Neither extreme will make you happy.',
        'For hate is never conquered by hate. Hate is conquered by love.',
        'For the things we have to learn before we can do them, we learn by doing them.',
        'Fortune Not Found: Abort, Retry, Ignore?',
        'From listening comes wisdom and from speaking repentance.',
        'From now on your kindness will lead you to success.',
        'Get your mind set – confidence will lead you on.',
        'Get your mind set…confidence will lead you on.',
        'Go for the gold today! You’ll be the champion of whatever.',
        'Go take a rest; you deserve it.',
        'Good news will be brought to you by mail.',
        'Good news will come to you by mail.',
        'Good to begin well, better to end well.',
        'Happiness begins with facing life with a smile and a wink.',
        'Happiness will bring you good luck.',
        'Happy life is just in front of you.',
        'Hard words break no bones, fine words butter no parsnips.',
        'Have a beautiful day.',
        'He who expects no gratitude shall never be disappointed. ',
        'He who knows he has enough is rich.',
        'He who knows others is wise. He who knows himself is enlightened.',
        'Help! I’m being held prisoner in a chinese bakery!',
        'How many of you believe in psycho-kinesis? Raise my hand.',
        'How you look depends on where you go.',
        'I learn by going where I have to go.',
        'If a true sense of value is to be yours it must come through service.',
        'If certainty were truth, we would never be wrong.',
        'If you continually give, you will continually have.',
        'If you look in the right places, you can find some good offerings.',
        'If you think you can do a thing or think you can’t do a thing, you’re right.',
        'If you wish to see the best in others, show the best of yourself.',
        'If your desires are not extravagant, they will be granted.',
        'If your desires are not to extravagant they will be granted. ',
        'If you’re feeling down, try throwing yourself into your work.',
        'Imagination rules the world.',
        'In order to take, one must first give.',
        'In the end all things will be known.',
        'In this world of contradiction, It’s better to be merry than wise.',
        'It could be better, but its [sic] good enough.',
        'It is better to be an optimist and proven a fool than to be a pessimist and be proven right.',
        'It is better to deal with problems before they arise.',
        'It is honorable to stand up for what is right, however unpopular it seems.',
        'It is worth reviewing some old lessons.',
        'It takes courage to admit fault.',
        'It’s not the amount of time you devote, but what you devote to the time that counts.',
        'It’s time to get moving. Your spirits will lift accordingly.',
        'Keep your face to the sunshine and you will never see shadows.',
        'Let the world be filled with tranquility and goodwill.',
        'Like the river flow into the sea. Something are just meant to be.',
        'Listen not to vain words of empty tongue.',
        'Listen to everyone. Ideas come from everywhere.',
        'Living with a commitment to excellence shall take you far.',
        'Long life is in store for you.',
        'Love is a warm fire to keep the soul warm.',
        'Love is like sweet medicine, good to the last drop.',
        'Love lights up the world.',
        'Love truth, but pardon error. ',
        'Man is born to live and not prepared to live.',
        'Man’s mind, once stretched by a new idea, never regains it’s original dimensions.',
        'Many will travel to hear you speak.',
        'Meditation with an old enemy is advised.',
        'Miles are covered one step at a time.',
        'Nature, time and patience are the three great physicians.',
        'Never fear! The end of something marks the start of something new.',
        'New ideas could be profitable.',
        'New people will bring you new realizations, especially about big issues. ',
        'No one can walk backwards into the future.',
        'Nothing is more difficult, and therefore more precious, than to be able to decide.',
        'Now is a good time to buy stock.',
        'Now is the time to go ahead and pursue that love interest!',
        'Now is the time to try something new',
        'Now is the time to try something new.',
        'Observe all men, but most of all yourself.',
        'One can never fill another’s shoes, rather he must outgrow the old shoes.',
        'One of the first things you should look for in a problem is its positive side.',
        'Others can help you now.',
        'Pennies from heaven find their way to your doorstep this year!',
        'People are attracted by your Delicate [sic] features.',
        'People find it difficult to resist your persuasive manner.',
        'Perhaps you’ve been focusing too much on saving.',
        'Physical activity will dramatically improve your outlook today.',
        'Pick battles big enough to matter, small enough to win.',
        'Place special emphasis on old friendship.',
        'Please visit us at www.wontonfood.com',
        'Po Says: Pandas like eating bamboo, but I prefer mine dipped in chocolate.',
        'Practice makes perfect.',
        'Protective measures will prevent costly disasters.',
        'Put your mind into planning today. Look into the future.',
        'Remember the birthday but never the age.',
        'Remember to share good fortune as well as bad with your friends.',
        'Rest has a peaceful effect on your physical and emotional health.',
        'Resting well is as important as working hard.',
        'Romance moves you in a new direction.',
        'Savor your freedom – it is precious.',
        'Say hello to others. You will have a happier day.',
        'Self-knowledge is a life long process.',
        'Share your joys and sorrows with your family.',
        'Sift through your past to get a better idea of the present.',
        'Sloth makes all things difficult; industry all easy.',
        'Small confidences mark the onset of a friendship.',
        'Society prepares the crime; the criminal commits it.',
        'Someone you care about seeks reconciliation.',
        'Soon life will become more interesting.',
        'Stand tall. Don’t look down upon yourself. ',
        'Staying close to home is going to be best for your morale today',
        'Stop searching forever, happiness is just next to you.',
        'Strong reasons make strong actions.',
        'Success is a journey, not a destination.',
        'Success is failure turned inside out.',
        'Success is going from failure to failure without loss of enthusiasm.',
        'Swimming is easy. Stay floating is hard.',
        'Take care and sensitivity you show towards others will return to you.',
        'Take the high road.',
        'Technology is the art of arranging the world so we do not notice it.',
        'The austerity you see around you covers the richness of life like a veil.',
        'The best prediction of future is the past.',
        'The change you started already have far-reaching effects. Be ready.',
        'The change you started already have far-reaching effects. Be ready.',
        'The first man gets the oyster, the second man gets the shell.',
        'The greatest achievement in life is to stand up again after falling.',
        'The harder you work, the luckier you get.',
        'The night life is for you.',
        'The one that recognizes the illusion does not act as if it is real.',
        'The only people who never fail are those who never try.',
        'The person who will not stand for something will fall for anything.',
        'The philosophy of one century is the common sense of the next.',
        'The saints are the sinners who keep on trying.',
        'The secret to good friends is no secret to you. ',
        'The small courtesies sweeten life, the greater ennoble it.',
        'The smart thing to do is to begin trusting your intuitions.',
        'The strong person understands how to withstand substantial loss.',
        'The sure way to predict the future is to invent it.',
        'The truly generous share, even with the undeserving.',
        'The value lies not within any particular thing, but in the desire placed on that thing.',
        'The weather is wonderful. ',
        'There is a time for caution, but not for fear.',
        'There is no mistake so great as that of being always right.',
        'There is no wisdom greater than kindness. ',
        'There is not greater pleasure than seeing your lived (sic) ones prosper.',
        'There’s no such thing as an ordinary cat.',
        'Things don’t just happen; they happen just.',
        'Those who care will make the effort.',
        'Time and patience are called for many surprises await you!. (sic)',
        'Time is precious, but truth is more precious than time',
        'To know oneself, one should assert oneself.',
        'To the world you may be one person, but to one person you may be the world.',
        'Today is the conserve yourself, as things just won’t budge.',
        'Today, your mouth might be moving but no one is listening.',
        'Tonight you will be blinded by passion.',
        'Use your eloquence where it will do the most good.',
        'We first make our habits, and then our habits make us.',
        'Welcome change.',
        '“Welcome” is a powerful word.',
        'Well done is better than well said.',
        'What’s hidden in an empty box?',
        'What’s that in your eye? Oh…it’s a sparkle.',
        'What’s yours in mine, and what’s mine is mine.',
        'When more become too much. It’s same as being not enough.',
        'When your heart is pure, your mind is clear.',
        'Wish you happiness.',
        'With age comes wisdom.',
        'You (sic) adventure could lead to happiness.',
        'You always bring others happiness.',
        'You are a person of another time.',
        'You are a talented storyteller. ',
        'You are admired by everyone for your talent and ability.',
        'You are almost there.',
        'You are busy, but you are happy.',
        'You are generous to an extreme and always think of the other fellow.',
        'You are going to have some new clothes. ',
        'You are in good hands this evening.',
        'You are interested in higher education, whether material or spiritual.',
        'You are modest and courteous.',
        'You are never selfish with your advice or your help.',
        'You are next in line for promotion in your firm.',
        'You are offered the dream of a lifetime. Say yes!',
        'You are open-minded and quick to make new friends. ',
        'You are solid and dependable.',
        'You are soon going to change your present line of work.',
        'You are talented in many ways.',
        'You are the master of every situation. ',
        'You are very expressive and positive in words, act and feeling.',
        'You are working hard.',
        'You begin to appreciate how important it is to share your personal beliefs.',
        'You can keep a secret.',
        'You can see a lot just by looking.',
        'You can’t steal second base and keep your foot on first.',
        'You desire recognition and you will find it.',
        'You have a deep appreciation of the arts and music.',
        'You have a deep interest in all that is artistic.',
        'You have a friendly heart and are well admired. ',
        'You have a shrewd knack for spotting insincerity.',
        'You have a yearning for perfection. ',
        'You have an active mind and a keen imagination.',
        'You have an ambitious nature and may make a name for yourself.',
        'You have an unusual equipment for success, use it properly.',
        'You have exceeded what was expected.',
        'You have had a good start. Work harder!',
        'You have the power to write your own fortune.',
        'You have yearning for perfection.',
        'You know where you are going and how to get there.',
        'You look pretty.',
        'You love challenge.',
        'You love chinese food.',
        'You make people realize that there exist other beauties in the world.',
        'You never hesitate to tackle the most difficult problems. ',
        'You never know who you touch.',
        'You only treasure what you lost.',
        'You seek to shield those you love and like the role of provider. ',
        'You should be able to make money and hold on to it.',
        'You should be able to undertake and complete anything.',
        'You should pay for this check. Be generous.',
        'You understand how to have fun with others and to enjoy your solitude.',
        'You will always be surrounded by true friends.',
        'You will always get what you want through your charm and personality.',
        'You will always have good luck in your personal affairs.',
        'You will be a great success both in the business world and society. ',
        'You will be blessed with longevity.',
        'You will be pleasantly surprised tonight.',
        'You will be sharing great news with all the people you love.',
        'You will be successful in your work.',
        'You will be traveling and coming into a fortune.',
        'You will be unusually successful in business.',
        'You will become a great philanthropist in your later years.',
        'You will become more and more wealthy.',
        'You will enjoy good health.',
        'You will enjoy good health; you will be surrounded by luxury.',
        'You will find great contentment in the daily, routine activities.',
        'You will have a fine capacity for the enjoyment of life.',
        'You will have gold pieces by the bushel.',
        'You will inherit a large sum of money.',
        'You will make change for the better.',
        'You will soon be surrounded by good friends and laughter.',
        'You will take a chance in something in near future.',
        'You will travel far and wide, both pleasure and business.',
        'You will travel far and wide,both pleasure and business.',
        'Your abilities are unparalleled.',
        'Your ability is appreciated.',
        'Your ability to juggle many tasks will take you far.',
        'Your biggest virtue is your modesty.',
        'Your character can be described as natural and unrestrained.',
        'Your difficulties will strengthen you.',
        'Your dreams are never silly; depend on them to guide you.',
        'Your dreams are worth your best efforts to achieve them.',
        'Your energy returns and you get things done.',
        'Your family is young, gifted and attractive.',
        'Your first love has never forgotten you.',
        'Your goal will be reached very soon.',
        'Your happiness is before you, not behind you! Cherish it.',
        'Your hard work will payoff today.',
        'Your heart will always make itself known through your words.',
        'Your home is the center of great love.',
        'Your ideals are well within your reach.',
        'Your infinite capacity for patience will be rewarded sooner or later.',
        'Your leadership qualities will be tested and proven.',
        'Your life will be happy and peaceful.',
        'Your life will get more and more exciting.',
        'Your love life will be happy and harmonious.',
        'Your love of music will be an important part of your life.',
        'Your loyalty is a virtue, but not when it’s wedded with blind stubbornness.',
        'Your mentality is alert, practical, and analytical.',
        'Your mind is creative, original and alert.',
        'Your mind is your greatest asset.',
        'Your moods signal a period of change.',
        'Your quick wits will get you out of a tough situation.',
        'Your reputation is your wealth.',
        'Your success will astonish everyone. ',
        'Your talents will be recognized and suitably rewarded.',
        'Your work interests can capture the highest status or prestige.'
    ] // Copied from https://joshmadison.com/2008/04/20/fortune-cookie-fortunes/ and formatted in Excel.
    
}

const complementGrabBag = new GrabBagRandomizer(dataArrays.complements, 5);
const fortunesGrabBag = new GrabBagRandomizer(dataArrays.fortunes, 5);

const grabBags = {

    complements: complementGrabBag,
    fortunes: fortunesGrabBag

}

function getIndex(type, id) {

    const arr = dataArrays[type];
    
    for (let i=0; i<arr.length; i++){

        const obj = arr[i];
        if (obj.id == id) {
            return i;
        }
    }

}

function parseType(type) {

    switch (type) {
        case 'toDoLists':
            return 'To Do List';
        case 'progressMeters':
            return 'Progress Meter';
        case 'accomplishments':
            return 'Accomplishment';
        case 'slideshowSources':
            return 'Slideshow Source';
        case 'complements':
            return 'Complement';
        case 'fortunes':
            return 'Fortunes'
    }
}

function formatedDate() {

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
}

module.exports = {
    
    getRandomItem(type) {

        return grabBags[type].pullItem();

    },

    getCompleteArray(type) {

        return dataArrays[type];

    },

    postTo(type, obj) {

        const issuedID = nextID();
        dataArrays[type].push({id: issuedID, ...obj});
        return true;

    },

    edit(type, id, obj) {

        const arr = dataArrays[type];
        const index = getIndex(type, id);
        const item = arr[index];

        if (item['id'] === parseInt(id)) {

            for (key in obj) {
                item[key] = obj[key];
            }

            return true

        } else {
            return false;
        }
    },

    addTo(type, id, obj) {

        const arr = dataArrays[type];
        const index = getIndex(type, id);
        const item = arr[index];

        if (item['id'] == id) {
            item['items'].push(obj);

            return true;

        } else {
            return false;
        }
    },

    updateItemStatus(type, id, obj) {

        const arr = dataArrays[type];
        const index = getIndex(type, id);
        const item = arr[index];

        if (item['id'] == id) {

            for (let i=0; i<item.items.length; i++) {

                if (item.items[i].text == obj.text) {
                    item.items[i].checked = obj.checked;
                }
            }

            return true;

        } else {
            return false;
        }
    },

    delete(type, id, obj) {

        if (isNaN(parseInt(id))) {
            id = getNumber(id);
        } else {
            id = parseInt(id);
        }
        
        const index = getIndex(type, id);
        const deletedItem = dataArrays[type].splice(index,1)[0];

        const {add} = obj;
        if (add) {
            const parsedType = parseType(type);
            const today = formatedDate();
            this.postTo('accomplishments', {
                type: parsedType,
                name: deletedItem.name,
                date: today,
                color: deletedItem.color
            });
        }

        if (deletedItem === undefined) {
            return false
        } else {
            return true
        }
    }
}