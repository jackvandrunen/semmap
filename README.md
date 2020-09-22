# semmap

I wanted to call it `semgrep` but that's apparently already taken.

`semmap` is a set of tools for searching through a database of documents in a
semantic way. Currently it is CLI only, but eventually I hope to implement
`semserve`, which will expose the toolkit as a web interface.

`semmap` is specifically designed to work with my personal knowledge base, and
by extension personal knowledge bases with a similar setup to mine. It expects
to be run in a directory containing markdown files. The file hierarchy can look
however you want, as `semmap` will walk through everything and pick out all the
markdown files it can find. As directories of markdown files are becoming at
least *a* norm for electronic notetaking, I hope this can benefit people other
than myself.

`semmap` is a thin layer on top of gensim, and uses Doc2Vec on the backend. No
pretrained model is currently available, so it is best used on a dataset that
is already mature and will provide it with a sufficient number of samples. At
the time I wrote these scripts, my personal knowledge base consisted of a
little over 400 notes, ranging in size from less than 50 words to more than
10,000 words. Your mileage may vary.

## Installation

First, install gensim:

```
pip install gensim
```

Then, clone this repository:

```
git clone https://github.com/jackvandrunen/semmap.git
```

Finally, add `<repository root>/bin` to your `PATH`.

## Usage

Before you can take advantage of the search features, you have to build the
database. Navigate to the root directory wherein your notes are stored, and
run `semcache`:

```
semcache build
```

`semcache` will give you some information about the dataset --- the number of
documents it found and the number of words in its vocabulary. Training should
take no more than a minute or two on modern computers. The database is stored
in `.semcache` in that directory.

If you add or modify your notes, you will need to run `build` again.
Eventually, I hope to add an `update` command which will add in new and
modified notes in a shorter amount of time.

Now, you can use the two main search tools, `semgrep` and the eponymous
`semmap`.

`semgrep` allows you to search the database using a word or phrase. It doesn't
find instances of the word or phrase, instead it converts the word or phrase to
a vector which attempts to capture its semantic content, and then finds the
documents (also represented by vectors) which are most similar to it. Under the
hood, it operates differently for single words which are in the trained
vocabulary as opposed to longer phrases and out-of-sample words. For best
performance, use of the former is preferred:

```
semgrep nietzsche
```

But you can also use longer phrases:

```
semgrep "staring into the abyss"
```

Use `semmap` to find relationships between notes in the database:

```
semmap ./book_reports/daybreak.md
```

This is, in my opinion, the more useful tool. The power it wields will be seen
more fully when `semserve` is implemented.

Both `semgrep` and `semmap` have an optional argument which specifies how many
results should be returned. The default is 10:

```
semgrep nietzsche -n 25
```