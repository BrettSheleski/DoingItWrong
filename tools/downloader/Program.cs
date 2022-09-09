

const string url = "https://doingitwrong.com";

HashSet<string> imagesDownloaded = new HashSet<string>();

System.Text.RegularExpressions.Regex htmlToImgSrc = new System.Text.RegularExpressions.Regex("<img[^>]+src=\"([^\">]+)\"");
System.Text.RegularExpressions.Match regexMatch;

string html;
string imgSrc;

List<Task> downloadTasks = new List<Task>();

using (HttpMessageHandler handler = new HttpClientHandler { CookieContainer = new System.Net.CookieContainer() })
using (HttpClient client = new HttpClient(handler))
{
    

    while (true)
    {
        html = await client.GetStringAsync(url);

        regexMatch = htmlToImgSrc.Match(html);

        if (!regexMatch.Success)
            throw new InvalidOperationException("Could not get image path or something.");

        imgSrc = regexMatch.Groups[1].Value;

        if (imagesDownloaded.Contains(imgSrc))
            break;

        imagesDownloaded.Add(imgSrc);

        downloadTasks.Add(DownloadAsync(url + imgSrc));
    }


    await Task.WhenAll(downloadTasks);

    Console.WriteLine($"Downloaded {imagesDownloaded.Count} images.  Enjoy!");
}


async Task DownloadAsync(string url)
{
    using (var downloadClient = new HttpClient())
    await using (var imgStream = await downloadClient.GetStreamAsync(url))
    await using (var imgFileStream = new FileStream(System.IO.Path.GetFileName(imgSrc), FileMode.Create))
    {
        await imgStream.CopyToAsync(imgFileStream);
    }
}