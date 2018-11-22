#!/usr/bin/env python3

import sys
import srt
# import codecs
from codecs import open as _open

# r_enc = codecs.getreader(args.encoding)
# w_enc = codecs.getwriter(args.encoding)

filename = sys.argv[1]
#shift = float(sys.argv[2])
scale = float(sys.argv[2])
encoding = sys.argv[3] or "utf8"

s = _open(filename, "r", encoding=encoding).read()

subs = list(srt.parse(s))

for sub in subs:
    # sub.start += shift
    # sub.end += shift
    sub.start = scale * sub.start
    sub.end = scale * sub.end

print(srt.compose(subs))
