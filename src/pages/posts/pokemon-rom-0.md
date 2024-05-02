---
pubDate: 2024-04-28
title: Pokemon ROM Parser - Day 0
tags: [Brainstorming]
layout: ../../layouts/PostLayout.astro
---

*TL;DR:*
> I want to maximize my pokemon's strength via EV training, but older pokemon games don't show you the accumulated EV points. So I'm going to make an app that tracks this. I explain how I got to this point and brainstorm the MVP a little.

## Background
I used to live and breathe pokemon. I've had my hands on Pokemon games that came out on the DS, and I especially enjoyed the main series - *Pokemon Platinum*, *HeartGold/SoulSilver*, *B/W* and *B2/W2*. 

Over the last couple of years, I switched over to [Pokemon Showdown](https://pokemonshowdown.com/) to see what kinds of Pokemon Nintendo was cooking up in the main series. This was where I learned a little about the competitive pokemon scene - specifically, the practice of "EV training" your pokemon. Essentially, it's a way to maximize the usefulness of a pokemon by strategically distributing *effort values* (EV) earned by pokemon, so that they have competitive edge.

There were phases over the years where I wanted to replay the old pokemon games. Whenever I did, I **always** EV trained my pokemon. I was (and still am) so obsessed with EV training, and for some inexplicable reason it feels wrong not to do it now.

Fast forward to today: I had heard about an NDS emulator that was approved on the App Store, and I made the dangerous decision to indulge in some pokemon nostalgia during finals season. Can you guess what kind of inexplicable urge kicked in???

## The Problem
I'm not sure if this issue still exists in the newer pokemon games, but the games I grew up playing had virtually no support for EV training. As in, there is no way for me to see how many EV points I gathered on a pokemon 💀

Keeping an accurate record of these EV points is extremely important, since every 4 EV points to a stat will contribute to +1 in that stat. For example, this means that if you have +3 EVs in a stat, you gain no stat bonuses!

Since the games I'm playing refuse to help me out with my EV-training obsession, I'm going to design an application that will do this for me.

## Features
I want to start off simple, which means I'm really only aiming for 1 core feature at the moment: 
> **Keep track of the EV distribution on every pokemon I train**

So at the moment, I think this will be a simple CRUD application.

- Update & persist EV distribution for a pokemon
- View the current EV distribution for a pokemon
- Limit to *Pokemon Platinum* only for now (generation IV)<sup>*</sup>

<br/>

<sup>*</sup> In order to keep the scope of the project within reason, I'll limit myself to just Pokemon Platinum and see how it goes from there. 