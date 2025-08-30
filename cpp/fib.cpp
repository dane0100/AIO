#include <iostream>
#include <string>

long long fib(int n) {
  if (n <= 1) return n;
  long long a = 0, b = 1, c;
  for (int i = 2; i <= n; ++i) {
    c = a + b;
    a = b;
    b = c;
  }
  return b;
}

int main(int argc, char* argv[]) {
  if (argc < 2) {
    std::cout << "Usage: fib <number>\n";
    return 1;
  }
  int n = std::stoi(argv[1]);
  std::cout << fib(n) << std::endl;
  return 0;
}