public class ShortUrl
{
    const string DEFAULT_ALPHABET = "mn6j2c4rv8bpygw95z7hsdaetxuk3fq";
    const int DEFAULT_BLOCK_SIZE = 24;
    const int MIN_LENGTH = 5;

    public ShortUrl() 
    {
        this.Alphabet = DEFAULT_ALPHABET;
        this.BlockSize = DEFAULT_BLOCK_SIZE;
        this.Mark = (1 << DEFAULT_BLOCK_SIZE) - 1;

        int[] array = new int[DEFAULT_BLOCK_SIZE];
        for (int i = 0; i < DEFAULT_BLOCK_SIZE; i++)
        {
            array[i] = i;
        }

        this.Mapping = array;
        this.Mapping = this.Mapping.Reverse<int>().ToArray<int>();    
    }

    private string Alphabet
    {
        get;
        set;
    }

    private int BlockSize
    {
        get;
        set;
    }

    private int Mark
    {
        get;
        set;
    }

    private int[] Mapping
    {
        get;
        set;
    }

    public int Encode(int n)
    {
        return (n & ~this.Mark) | this._encode(n & this.Mark);
    }
    
    private int _encode(int n)
    {
        int result = 0;
        for(int i=0;i<this.Mapping.Length;i++)
        {
            int b = this.Mapping[i];
            if ((n & (1 << i)) > 0)
                result |= (1 << b);
        }
        
        return result;
    }
    
    public string Enbase(int x, int min_length = MIN_LENGTH)
    {
        string result = this._enbase(x);
        int nP = min_length - result.Length;
        string padding = string.Empty;
        if (nP > 0)
        {
            padding = padding.PadLeft(nP, this.Alphabet[0]);
        }

        return padding + result;
    }

    private string _enbase(int x)
    {
        int n = this.Alphabet.Length;
        if (x < n)
            return this.Alphabet[x].ToString();

        return this._enbase(x / n) + this.Alphabet[x % n].ToString();
    }

    public int debase(string x)
    {
        int n = this.Alphabet.Length;
        int result = 0;
        char[] array = x.Reverse<char>().ToArray<char>();

        for(int i=0;i<array.Length;i++)
        {
            char c = array[i];
            result += this.Alphabet.IndexOf(c) * Convert.ToInt32(Math.Pow(n, i));
        }

        return result;
    }

    public int decode(int n)
    {
        return (n & ~this.Mark) | this._decode(n & this.Mark);
    }

    private int _decode(int n)
    {
        int result = 0;
        for(int i=0;i<this.Mapping.Length;i++)
        {
            int b = this.Mapping[i];

            if ((n & (1 << b)) > 0)
                result |= (1 << i);
        }

        return result;
    }
}