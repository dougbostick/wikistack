//i made this file because i was tired of refilling out my form for data

const { db, User, Page } = require('./models');

const seed =  async () => {
   await User.create({name: 'Doug', email: 'doug@gmail.com'})
   await User.create({name: 'Frank', email: 'frank@gmail.com'})
   await Page.create({userId: 1, title: 'Doug Title', slug: 'doug_title', content: 'doug content', status: 'open'})
   await Page.create({userId: 2, title: 'Frank Title', slug: 'frank', content: 'frank content', status: 'open'})
   await Page.create({userId: 1, title: 'Doug Title2', slug: 'doug_title2', content: 'doug content2', status: 'open'})

}

seed();