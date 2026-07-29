package at.htl.blockchain;

import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;


@ApplicationScoped
public class ContractConfig {


    @ConfigProperty(name="blockchain.rpc")
    String rpcUrl;


    @ConfigProperty(name="blockchain.contract")
    String contractAddress;


    @ConfigProperty(name="blockchain.private-key")
    String privateKey;


    public String getRpcUrl(){
        return rpcUrl;
    }


    public String getContractAddress(){
        return contractAddress;
    }


    public String getPrivateKey(){
        return privateKey;
    }
}