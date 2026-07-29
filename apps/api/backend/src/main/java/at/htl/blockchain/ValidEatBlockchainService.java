package at.htl.blockchain;


import jakarta.enterprise.context.ApplicationScoped;
import org.web3j.abi.FunctionEncoder;
import org.web3j.abi.FunctionReturnDecoder;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.Utf8String;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.abi.TypeReference;
import org.web3j.crypto.Credentials;
import org.web3j.crypto.RawTransaction;
import org.web3j.crypto.TransactionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.http.HttpService;
import org.web3j.utils.Numeric;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;


@ApplicationScoped
public class ValidEatBlockchainService {


    private final Web3j web3j;
    private final Credentials credentials;
    private final ContractConfig config;


    public ValidEatBlockchainService(
            ContractConfig config
    ) {

        this.config = config;


        this.web3j = Web3j.build(
                new HttpService(config.getRpcUrl())
        );


        this.credentials =
                Credentials.create(
                        config.getPrivateKey()
                );
    }



    public void addLog(String message) throws Exception {


        Function function =
                new Function(
                        "addLog",
                        List.of(
                                new Utf8String(message)
                        ),
                        List.of()
                );


        String encodedFunction =
                FunctionEncoder.encode(function);



        BigInteger nonce =
                web3j.ethGetTransactionCount(
                                credentials.getAddress(),
                                DefaultBlockParameterName.LATEST
                        )
                        .send()
                        .getTransactionCount();



        RawTransaction rawTransaction =
                RawTransaction.createTransaction(
                        nonce,
                        BigInteger.valueOf(3000000000L),
                        BigInteger.valueOf(3000000),
                        config.getContractAddress(),
                        encodedFunction
                );



        byte[] signedMessage =
                TransactionEncoder.signMessage(
                        rawTransaction,
                        credentials
                );



        String hexValue =
                Numeric.toHexString(
                        signedMessage
                );



        var response =
                web3j.ethSendRawTransaction(
                                hexValue
                        )
                        .send();



        System.out.println(
                "TX HASH: "
                        + response.getTransactionHash()
        );
    }


    public List<String> getLogs() throws Exception {


        Function function = new Function(
                "getLogs",
                List.of(),
                List.of(
                        new TypeReference<DynamicArray<Utf8String>>() {},
                        new TypeReference<DynamicArray<Uint256>>() {}
                )
        );


        String encodedFunction = FunctionEncoder.encode(function);

        var response =
                web3j.ethCall(
                        Transaction.createEthCallTransaction(
                                credentials.getAddress(),
                                config.getContractAddress(),
                                encodedFunction
                        ),
                        DefaultBlockParameterName.LATEST
                ).send();

        List<Type> decoded =
                FunctionReturnDecoder.decode(
                        response.getValue(),
                        function.getOutputParameters()
                );

        List<String> result = new ArrayList<>();
        DynamicArray<Utf8String> messages = (DynamicArray<Utf8String>) decoded.get(0);
        DynamicArray<Uint256> timestamps = (DynamicArray<Uint256>) decoded.get(1);

        for(int i = 0; i < messages.getValue().size(); i++){
            result.add(messages.getValue().get(i).getValue()
                       + " | "
                       + timestamps.getValue().get(i).getValue()
            );
        }
        return result;
    }
}