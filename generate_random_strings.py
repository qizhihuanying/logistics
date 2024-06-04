import random
import string
import argparse

def generate_random_string(length=16):
    characters = string.ascii_lowercase + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

def main():
    parser = argparse.ArgumentParser(description="Generate random alphanumeric strings.")
    parser.add_argument('count', type=int, help="Number of random strings to generate.")
    args = parser.parse_args()

    for _ in range(args.count):
        print(generate_random_string())

if __name__ == "__main__":
    main()
