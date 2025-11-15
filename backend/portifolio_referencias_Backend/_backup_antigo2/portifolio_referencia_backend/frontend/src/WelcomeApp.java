import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class WelcomeApp {
    public static void main(String[] args) {
        // Criação da janela
        JFrame frame = new JFrame("Tela de Boas-vindas");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(400, 200);
        
        // Criação do painel
        JPanel panel = new JPanel();
        panel.setLayout(new FlowLayout());
        
        // Label de boas-vindas
        JLabel welcomeLabel = new JLabel("Bem-vindo ao nosso sistema!");
        panel.add(welcomeLabel);
        
        // Campo de texto para o nome
        JLabel nameLabel = new JLabel("Digite seu nome:");
        JTextField nameField = new JTextField(20);
        panel.add(nameLabel);
        panel.add(nameField);
        
        // Botão de confirmação
        JButton confirmButton = new JButton("Confirmar");
        panel.add(confirmButton);
        
        // Label para mostrar a mensagem de boas-vindas com o nome
        JLabel resultLabel = new JLabel("");
        panel.add(resultLabel);
        
        // Ação do botão
        confirmButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String name = nameField.getText();
                if (!name.isEmpty()) {
                    resultLabel.setText("Seja bem-vindo(a), " + name + "!");
                    System.out.println("Seja bem-vindo(a), " + name + "!");
                } else {
                    resultLabel.setText("Por favor, digite um nome.");
                }
            }
        });
        
        // Adiciona o painel à janela
        frame.add(panel);
        
        // Exibe a janela
        frame.setVisible(true);
    }
}
