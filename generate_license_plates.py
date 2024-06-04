import random
import argparse

# 定义中国车牌的字母和数字范围
province_letters = "京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领"
alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ"
numbers = "0123456789"

def generate_plate():
    plate = random.choice(province_letters)
    plate += random.choice(alphabet)
    for _ in range(4):
        plate += random.choice(alphabet + numbers)
    plate += random.choice(alphabet + numbers)
    return plate

def main():
    parser = argparse.ArgumentParser(description="Generate random Chinese license plates.")
    parser.add_argument('count', type=int, help="Number of random license plates to generate.")
    args = parser.parse_args()

    for _ in range(args.count):
        print(generate_plate())

if __name__ == "__main__":
    main()