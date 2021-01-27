# performance-table
Run local lighthouse tests on multiple urls and produce a table output. Perfect for Copy+Paste.

# How to
1. Run `npm install`
2. Open config.js and add the urls to test to the urls array.
3. Run `npm start`

# Table output
You can modify the table output in config.js as well by modifying the `tableOptions` constant. See https://github.com/gajus/table for options.

# What do you get
Lighthouse Score and the main metrics for mobile and desktop like so:

```
╔══════════════════════════════════╤═══════╤═══════╤═══════╤═══════╤═══════╤════════╤═══════╗
║ URL                              │ SCORE │ FCP   │ SI    │ LCP   │ TTI   │ TBT    │ CLS   ║
╟──────────────────────────────────┼───────┼───────┼───────┼───────┼───────┼────────┼───────╢
║ https://bossip.com/              │       │       │       │       │       │        │       ║
║ -- mobile                        │ 84    │ 1.1 s │ 2.0 s │ 4.1 s │ 3.9 s │ 180 ms │ 0.107 ║
║ -- desktop                       │ 81    │ 0.3 s │ 2.2 s │ 0.7 s │ 5.0 s │ 60 ms  │ 0.346 ║
╟──────────────────────────────────┼───────┼───────┼───────┼───────┼───────┼────────┼───────╢
║ https://bossip.com/category/smh/ │       │       │       │       │       │        │       ║
║ -- mobile                        │ 87    │ 1.1 s │ 2.2 s │ 3.9 s │ 3.4 s │ 130 ms │ 0.055 ║
║ -- desktop                       │ 95    │ 0.3 s │ 0.7 s │ 0.8 s │ 0.4 s │ 0 ms   │ 0.6   ║
╚══════════════════════════════════╧═══════╧═══════╧═══════╧═══════╧═══════╧════════╧═══════╝
```

Nice!