#!/usr/bin/env python3
"""Seal an HTML file for the passphrase gate at /carl/.

    CARL_PASS='…' python3 tools/seal_board.py path/to/dk-fit-board.html [-o carl/board.enc.json]

AES-256-GCM, key = PBKDF2-HMAC-SHA256(passphrase, random 16-byte salt, 600k iterations).
Fresh salt + IV on every run; a re-seal therefore clears any "keep on this device" key
and the gate asks for the passphrase once more. Requires: pip install cryptography
"""
import argparse, base64, getpass, json, os, sys
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

ITER = 600_000


def seal(html: bytes, passphrase: str) -> dict:
    salt, iv = os.urandom(16), os.urandom(12)
    key = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITER).derive(passphrase.encode())
    ct = AESGCM(key).encrypt(iv, html, None)  # ciphertext || 16-byte tag, as WebCrypto expects
    b = lambda x: base64.b64encode(x).decode()
    return {"v": 1, "iter": ITER, "salt": b(salt), "iv": b(iv), "ct": b(ct)}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("html")
    ap.add_argument("-o", "--out", default=os.path.join(os.path.dirname(__file__), "..", "carl", "board.enc.json"))
    a = ap.parse_args()
    pw = os.environ.get("CARL_PASS") or getpass.getpass("passphrase: ")
    if len(pw) < 12:
        print("passphrase too short (min 12 chars); the blob is public and brute-forceable offline", file=sys.stderr)
        return 2
    with open(a.html, "rb") as f:
        blob = seal(f.read(), pw)
    with open(a.out, "w") as f:
        json.dump(blob, f, separators=(",", ":"))
    print(f"sealed {a.html} -> {os.path.normpath(a.out)} ({len(blob['ct'])} b64 chars)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
