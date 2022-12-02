import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Main {
    public List<List<Integer>> readFile(String filename) throws IOException {
        File file = new File(filename);
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String s;
            List<List<Integer>> output = new ArrayList<>();
            List<Integer> curr = new ArrayList<>();

            while((s = br.readLine()) != null) {
                if (s.isEmpty()) {
                    output.add(curr);
                    curr = new ArrayList<>();
                } else {
                    curr.add(Integer.parseInt(s));
                }
            }
            output.add(curr);
            return output;
        } catch (NumberFormatException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    public Integer findMostCalories(List<List<Integer>> input) {
        return input.stream().map(list -> list.stream().reduce(0, Integer::sum)).max(Integer::compare).orElse(0);
    }

    public Integer findTop3Calories(List<List<Integer>> input) {
        return input.stream().map(list -> list.stream().reduce(0, Integer::sum)).sorted(Comparator.reverseOrder()).limit(3).reduce(0, Integer::sum);
    }

    public static void main(String[] args) {
        Main main = new Main();

        try {
            List<List<Integer>> input = main.readFile("Day1/input.txt");
            //System.out.println(input);
            System.out.println(main.findTop3Calories(input));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}