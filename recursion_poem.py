def recursion_poem(n):
    if n <= 0:
        return "That's all folks!"
    
    return f"This is line {n}\n" + recursion_poem(n - 1)

def main():
    print(recursion_poem(5))

if __name__ == "__main__":
    main()
