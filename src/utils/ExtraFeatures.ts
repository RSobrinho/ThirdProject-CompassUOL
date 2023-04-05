import { ValidationError } from '../errors/validationError'

class ExtraFeatures {
  public generateBrasilianState (): string {
    const states = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

    const randomIndex = Math.floor(Math.random() * states.length)

    return states[randomIndex]
  }

  public generateCPF (): string {
    const cpfNumbers: number[] = []
    for (let i = 0; i < 9; i++) {
      cpfNumbers.push(Math.floor(Math.random() * 10))
    }

    const firstVerifierDigit = this.calculateVerifierDigit(cpfNumbers)

    cpfNumbers.push(firstVerifierDigit)

    const secondVerifierDigit = this.calculateVerifierDigit([...cpfNumbers])

    cpfNumbers.push(secondVerifierDigit)

    const formattedCPF = cpfNumbers.join('').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

    return formattedCPF
  }

  public validateCPF (formattedCPF: string): boolean {
    const cpfWithoutFormat = formattedCPF.replace(/[^\d]/g, '')

    if (cpfWithoutFormat.length !== 11) {
      return false
    }

    const cpfNumbers = [...cpfWithoutFormat].map((a) => parseInt(a))

    const firstVerifierDigit = this.calculateVerifierDigit(cpfNumbers.slice(0, 9))
    const secondVerifierDigit = this.calculateVerifierDigit(cpfNumbers.slice(0, 10))

    if (cpfNumbers[9] !== firstVerifierDigit || cpfNumbers[10] !== secondVerifierDigit) {
      return false
    }

    return true
  }

  private calculateVerifierDigit (cpfNumbers: number[]): number {
    const sum = cpfNumbers.reduce((total, number, index) => {
      return total + number * (10 - index)
    }, 0)

    const remainder = sum % 11
    const verifierDigit = remainder < 2 ? 0 : 11 - remainder

    return verifierDigit
  }

  public generateCEP (): string {
    const cepNumbers: number[] = []
    for (let i = 0; i < 5; i++) {
      cepNumbers.push(Math.floor(Math.random() * 10))
    }
    cepNumbers.push(0, 0, Math.floor(Math.random() * 10))

    return cepNumbers.join('')
  }
}

export const extraFeatures = new ExtraFeatures()
