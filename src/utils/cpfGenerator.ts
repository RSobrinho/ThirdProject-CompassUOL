class CPFGenerator {
  private cpfNumbers: number[]

  public generateCPF (): string {
    for (let i = 0; i < 9; i++) {
      this.cpfNumbers.push(Math.floor(Math.random() * 10))
    }

    const firstVerifierDigit = this.calculateVerifierDigit(this.cpfNumbers)

    this.cpfNumbers.push(firstVerifierDigit)

    const secondVerifierDigit = this.calculateVerifierDigit(this.cpfNumbers)

    this.cpfNumbers.push(secondVerifierDigit)

    const formattedCPF = this.cpfNumbers.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    return formattedCPF
  }

  private calculateVerifierDigit (cpfNumbers: number[]): number {
    const sum = cpfNumbers.reduce((total, number, index) => {
      return total + (number * (10 - index))
    }, 0)

    const remainder = sum % 11
    const verifierDigit = remainder < 2 ? 0 : 11 - remainder

    return verifierDigit
  }
}

export const cpf = new CPFGenerator.generateCPF()