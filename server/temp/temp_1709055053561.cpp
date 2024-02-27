#include <iostream>
#include <string>

int main() {
    std::string str = "algouniversity";
    int n = str.length();
    
    // Reverse the string
    for(int i = 0; i < n/2; i++) {
        char temp = str[i];
        str[i] = str[n - i - 1];
        str[n - i - 1] = temp;
    }
    
    // Print the reversed string
    std::cout << str << std::endl;
    
    return 0;
}